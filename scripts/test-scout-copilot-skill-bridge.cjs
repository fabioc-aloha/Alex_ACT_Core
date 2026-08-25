'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const {
  applyPlan,
  buildPlan,
  parseArgs,
  runCanary,
} = require(path.join(
  root,
  '.github',
  'skills',
  'manage-scout-copilot-skill-bridge',
  'scripts',
  'scout-copilot-skill-bridge.cjs',
));

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function fixture(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'scout-copilot-bridge-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const copilotHome = path.join(base, 'copilot');
  const bridgeRoot = path.join(copilotHome, 'skills');
  const scoutHome = path.join(base, 'scout');
  const manifest = path.join(base, 'bridge.json');
  const target = path.join(
    copilotHome,
    'installed-plugins',
    'fixture-market',
    'fixture-plugin',
    'skills',
    'fixture-skill',
  );
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'SKILL.md'), '# Fixture\n');
  writeJson(manifest, {
    schemaVersion: 1,
    scoutNativePlugins: ['alex-act-core'],
    scoutExcludedPlugins: ['fixture-plugin'],
    sources: [{
      plugin: 'fixture-plugin',
      marketplace: 'fixture-market',
      skillRoot: 'skills',
      skills: ['fixture-skill'],
    }],
    canarySkills: ['fixture-skill'],
  });
  fs.mkdirSync(scoutHome, { recursive: true });
  fs.writeFileSync(path.join(scoutHome, 'config.json'), [
    '// Scout writes this file as JSONC.',
    '{',
    '  "installedPlugins": [{ "name": "alex-act-core", "enabled": true, }],',
    '}',
  ].join('\n'));
  return { base, bridgeRoot, copilotHome, manifest, scoutHome, target };
}

function optionsFor(fixtureData, extra = []) {
  return parseArgs([
    '--copilot-home', fixtureData.copilotHome,
    '--bridge-root', fixtureData.bridgeRoot,
    '--scout-home', fixtureData.scoutHome,
    '--manifest', fixtureData.manifest,
    ...extra,
  ]);
}

test('bridge doctor previews without writing and applies only manifest-owned links', (t) => {
  const data = fixture(t);
  const preview = buildPlan(optionsFor(data));
  assert.equal(preview.links[0].action, 'create');
  assert.equal(fs.existsSync(data.bridgeRoot), false);
  assert.deepEqual(preview.scout.excludedInstalled, []);

  const applied = applyPlan(buildPlan(optionsFor(data, ['--apply'])));
  assert.equal(applied.verification.targetsValid, 1);
  assert.equal(fs.existsSync(path.join(data.bridgeRoot, 'fixture-skill', 'SKILL.md')), true);
  assert.deepEqual(runCanary(applied), [{
    name: 'fixture-skill',
    plugin: 'fixture-plugin',
    readable: true,
  }]);
  assert.equal(buildPlan(optionsFor(data)).links[0].action, 'preserve');
});

test('bridge doctor refuses to replace a user-owned directory', (t) => {
  const data = fixture(t);
  fs.mkdirSync(path.join(data.bridgeRoot, 'fixture-skill'), { recursive: true });
  const plan = buildPlan(optionsFor(data, ['--apply']));
  assert.equal(plan.links[0].action, 'conflict');
  assert.throws(() => applyPlan(plan), /refusing to replace user-owned bridge entries/);
});

test('bridge doctor reports excluded Scout plugins without mutating Scout configuration', (t) => {
  const data = fixture(t);
  writeJson(path.join(data.scoutHome, 'config.json'), {
    installedPlugins: [
      { name: 'alex-act-core', enabled: true },
      { name: 'fixture-plugin', enabled: true },
    ],
  });
  const plan = buildPlan(optionsFor(data));
  assert.deepEqual(plan.scout.excludedInstalled, ['fixture-plugin']);
  assert.equal(plan.scout.missingNative.length, 0);
});
