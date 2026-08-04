'use strict';

const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const script = path.join(root, '.github', 'skills', 'plugin-management', 'scripts', 'core-operations.cjs');

function workspace(t) {
  const value = fs.mkdtempSync(path.join(os.tmpdir(), 'core-workspace-bootstrap-'));
  t.after(() => fs.rmSync(value, { recursive: true, force: true }));
  return value;
}

function run(target, ...args) {
  return execFileSync(process.execPath, [script, 'bootstrap-workspace', '--target', target, ...args], {
    cwd: root,
    encoding: 'utf8',
  });
}

test('dry run previews a fresh workspace without writing', (t) => {
  const target = workspace(t);
  const plan = JSON.parse(run(target));
  assert.equal(plan.apply, false);
  assert.equal(plan.css.action, 'create');
  assert.equal(plan.settings.action, 'create');
  assert.equal(fs.existsSync(path.join(target, '.vscode')), false);
});

test('apply creates CSS and workspace-relative Markdown settings', (t) => {
  const target = workspace(t);
  const plan = JSON.parse(run(target, '--apply'));
  const css = path.join(target, '.vscode', 'markdown-light.css');
  const settings = JSON.parse(fs.readFileSync(path.join(target, '.vscode', 'settings.json'), 'utf8'));
  assert.equal(plan.apply, true);
  assert.equal(fs.existsSync(css), true);
  assert.deepEqual(settings['markdown.styles'], ['.vscode/markdown-light.css']);
  assert.equal(plan.css.sha256.length, 64);
});

test('existing CSS and custom markdown.styles are preserved', (t) => {
  const target = workspace(t);
  fs.mkdirSync(path.join(target, '.vscode'), { recursive: true });
  fs.writeFileSync(path.join(target, '.vscode', 'markdown-light.css'), 'custom-css\n');
  const originalSettings = '{\n  // keep\n  "markdown.styles": ["custom.css"],\n  "editor.tabSize": 4,\n}\n';
  const settingsPath = path.join(target, '.vscode', 'settings.json');
  fs.writeFileSync(settingsPath, originalSettings);
  const plan = JSON.parse(run(target, '--apply'));
  const currentSettings = fs.readFileSync(settingsPath, 'utf8');
  const { stripJsonc } = require('../.github/skills/plugin-management/scripts/core-operations.cjs');
  const settings = JSON.parse(stripJsonc(currentSettings));
  assert.equal(fs.readFileSync(path.join(target, '.vscode', 'markdown-light.css'), 'utf8'), 'custom-css\n');
  assert.equal(currentSettings, originalSettings);
  assert.deepEqual(settings['markdown.styles'], ['custom.css']);
  assert.equal(settings['editor.tabSize'], 4);
  assert.equal(plan.css.action, 'preserve');
  assert.equal(plan.css.matchesSource, false);
});

test('explicit refresh replaces differing CSS and preserves custom settings', (t) => {
  const target = workspace(t);
  fs.mkdirSync(path.join(target, '.vscode'), { recursive: true });
  const css = path.join(target, '.vscode', 'markdown-light.css');
  const settingsPath = path.join(target, '.vscode', 'settings.json');
  fs.writeFileSync(css, 'stale-css\n');
  fs.writeFileSync(settingsPath, '{"markdown.styles":["custom.css"]}\n');
  const plan = JSON.parse(run(target, '--refresh-css', '--apply'));
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  assert.equal(plan.css.action, 'refresh');
  assert.equal(plan.css.matchesSource, false);
  assert.equal(plan.css.sha256.length, 64);
  assert.notEqual(fs.readFileSync(css, 'utf8'), 'stale-css\n');
  assert.deepEqual(settings['markdown.styles'], ['custom.css']);
});

test('malformed JSONC stops before any write', (t) => {
  const target = workspace(t);
  fs.mkdirSync(path.join(target, '.vscode'), { recursive: true });
  const settings = path.join(target, '.vscode', 'settings.json');
  fs.writeFileSync(settings, '{ broken');
  const result = spawnSync(process.execPath, [script, 'bootstrap-workspace', '--target', target, '--apply'], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.equal(fs.readFileSync(settings, 'utf8'), '{ broken');
  assert.equal(fs.existsSync(path.join(target, '.vscode', 'markdown-light.css')), false);
});

test('broad vscode ignore is narrowed and unrelated rules survive', (t) => {
  const target = workspace(t);
  fs.writeFileSync(path.join(target, '.gitignore'), 'node_modules/\n.vscode/\ndist/\n');
  run(target, '--apply');
  const ignore = fs.readFileSync(path.join(target, '.gitignore'), 'utf8');
  assert.match(ignore, /node_modules\//);
  assert.match(ignore, /dist\//);
  assert.match(ignore, /\.vscode\/\*/);
  assert.match(ignore, /!\.vscode\/settings\.json/);
  assert.match(ignore, /!\.vscode\/markdown-light\.css/);
  assert.doesNotMatch(ignore, /^\.vscode\/$/m);
});

test('second apply is a no-op', (t) => {
  const target = workspace(t);
  run(target, '--apply');
  const plan = JSON.parse(run(target, '--apply'));
  assert.equal(plan.css.action, 'preserve');
  assert.equal(plan.settings.action, 'preserve');
  assert.equal(plan.gitignore.action, 'none');
});
