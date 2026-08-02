const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const allowedPluginVerbs = new Set([
  'install',
  'list',
  'marketplace',
  'uninstall',
  'update',
]);

function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('active Core guidance uses only supported Copilot plugin verbs', () => {
  const files = [
    ...walkFiles(path.join(root, '.github')),
    path.join(root, 'README.md'),
    path.join(root, 'manifest.json'),
    path.join(root, 'plugin.json'),
  ].filter((file) => /\.(?:json|md)$/.test(file));

  const violations = [];
  const commandPattern = /copilot plugin\s+([a-z-]+)/g;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(commandPattern)) {
      if (!allowedPluginVerbs.has(match[1])) {
        violations.push(`${path.relative(root, file)}: ${match[0]}`);
      }
    }
  }

  assert.deepEqual(violations, []);
});

test('fresh-install guidance invokes install-constellation explicitly', () => {
  const readme = read('README.md');
  assert.match(readme, /\/alex-act-core install-constellation/);
  assert.doesNotMatch(readme, /greet Core/);
  assert.doesNotMatch(readme, /No slash commands to memorize/);
});

test('install prompt includes separately consented bootstrap', () => {
  const prompt = read('.github/prompts/install-constellation.prompt.md');
  assert.match(prompt, /Step 6/);
  assert.match(prompt, /separate consent/i);
  assert.match(prompt, /copilot plugin list/);
  assert.doesNotMatch(prompt, /copilot plugin info/);
});

test('plugin command prompts survive an unavailable generic skill tool', () => {
  const prompts = fs.readdirSync(path.join(root, '.github', 'prompts'))
    .filter((name) => name.endsWith('.prompt.md'))
    .map((name) => `.github/prompts/${name}`);

  for (const promptPath of prompts) {
    const prompt = read(promptPath);
    assert.match(
      prompt,
      /generic skill tool.*unavailable|do not invoke the generic skill tool/i,
      `${promptPath} needs an explicit skill-tool fallback`,
    );
  }
});

test('workspace bootstrap has a namespaced prompt and detailed skill contract', () => {
  const prompt = read('.github/prompts/bootstrap-workspace.prompt.md');
  const skill = read('.github/skills/bootstrap-workspace/SKILL.md');

  assert.match(prompt, /bootstrap-workspace/);
  assert.match(prompt, /generic skill tool.*unavailable/i);
  assert.match(prompt, /preview/i);
  assert.match(prompt, /explicit consent/i);
  assert.match(skill, /markdown\.styles/);
  assert.match(skill, /set-if-absent/i);
  assert.match(skill, /preserve/i);
  assert.match(skill, /user settings/i);
});

test('install flow verifies exact versions and reports activation by plane', () => {
  const prompt = read('.github/prompts/install-constellation.prompt.md');
  const skill = read('.github/skills/install-constellation/SKILL.md');
  const management = read('.github/skills/plugin-management/SKILL.md');

  assert.match(management, /\.github\/plugin\/marketplace\.json/);
  assert.match(management, /exact (?:plugin )?record/i);
  assert.match(skill, /bootstrap-only/i);
  assert.match(skill, /AI.*smoke.*optional|optional.*AI.*smoke/is);
  for (const plane of ['installed', 'enabled', 'instruction-loaded', 'skill-invokable']) {
    assert.match(`${prompt}\n${skill}`, new RegExp(plane, 'i'));
  }
});

test('marketplace version resolver selects exact records and fails on missing plugins', (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'core-marketplace-versions-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const fixture = path.join(directory, 'marketplace.json');
  fs.writeFileSync(fixture, JSON.stringify({
    plugins: [
      { name: 'alex-act-core', version: '0.5.1', source: 'plugins/core' },
      { name: 'alex-act-enterprise', version: '0.1.2', source: 'plugins/enterprise' },
    ],
  }));
  const script = path.join(root, '.github', 'skills', 'plugin-management', 'scripts', 'core-operations.cjs');
  const output = JSON.parse(execFileSync(process.execPath, [
    script,
    'marketplace-versions',
    '--file', fixture,
    '--plugins', 'alex-act-core,alex-act-enterprise',
  ], { encoding: 'utf8' }));
  assert.deepEqual(output, [
    { name: 'alex-act-core', version: '0.5.1', source: 'plugins/core' },
    { name: 'alex-act-enterprise', version: '0.1.2', source: 'plugins/enterprise' },
  ]);

  const missing = spawnSync(process.execPath, [
    script,
    'marketplace-versions',
    '--file', fixture,
    '--plugins', 'not-real',
  ], { encoding: 'utf8' });
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /plugin record not found: not-real/);
});
