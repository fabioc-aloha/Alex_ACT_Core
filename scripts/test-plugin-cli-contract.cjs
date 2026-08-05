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
  assert.match(readme, /copilot plugin install alex-act-manager@alex-mall/);
  assert.match(readme, /copilot plugin install alex-act-core@alex-mall/);
  assert.match(readme, /\/alex-act-manager install-constellation/);
  assert.doesNotMatch(readme, /\/alex-act-core install-constellation/);
  assert.doesNotMatch(readme, /greet Core/);
  assert.doesNotMatch(readme, /No slash commands to memorize/);
});

test('install prompt delegates lifecycle and consent gates to Manager', () => {
  const prompt = read('.github/prompts/install-constellation.prompt.md');
  assert.match(prompt, /\/alex-act-manager install-constellation/);
  assert.match(prompt, /separate consent/i);
  assert.match(prompt, /copilot plugin list/);
  assert.match(prompt, /Manager owns constellation lifecycle/);
  assert.doesNotMatch(prompt, /workspace capabilities|configure-workspace-capabilities/);
  assert.doesNotMatch(prompt, /install approved plugins in order/);
  assert.doesNotMatch(prompt, /copilot plugin info/);
});

test('Core user baseline carries the framework discovery floor', () => {
  const baseline = JSON.parse(read('.github/config/welcome-baseline.json')).settings;
  assert.equal(baseline['chat.agentSkillsLocations']['.github/skills'], true);
  assert.equal(baseline['chat.agentSkillsLocations']['.github/skills/local'], true);
  assert.equal(baseline['chat.agentSkillsLocations']['~/.copilot/skills'], true);
  assert.equal(baseline['chat.promptFilesLocations']['.github/prompts'], true);
  assert.equal(baseline['chat.promptFilesLocations']['.github/prompts/local'], true);
  assert.equal(baseline['chat.agentFilesLocations']['.github/agents'], true);
  assert.equal(baseline['chat.agentFilesLocations']['.github/agents/local'], true);
  assert.equal(baseline['chat.hookFilesLocations']['.github/hooks'], true);
  assert.equal(baseline['chat.hookFilesLocations']['~/.copilot/hooks'], true);
  assert.equal(baseline['chat.editing.revealNextChangeOnResolve'], false,
    'chat edits must not automatically reveal the next changed file');
  assert.equal(Object.hasOwn(baseline, 'markdown.styles'), false,
    'local Markdown CSS must remain workspace-scoped');
});

test('Core user baseline merge preserves unrelated settings and gates local CSS removal', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-user-settings-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const settings = path.join(target, 'settings.json');
  fs.writeFileSync(settings, JSON.stringify({
    'editor.fontSize': 15,
    'chat.agentSkillsLocations': { '.agents/skills': true },
    'markdown.styles': ['C:/custom/markdown.css'],
  }, null, 2));
  const script = path.join(
    root, '.github', 'skills', 'plugin-management', 'scripts', 'core-operations.cjs');

  const preview = JSON.parse(execFileSync(process.execPath, [
    script, 'configure-vscode', '--target-settings', settings,
  ], { cwd: root, encoding: 'utf8' }));
  assert.deepEqual(preview.unsupportedLocalMarkdownStyles, ['C:/custom/markdown.css']);
  assert.equal(JSON.parse(fs.readFileSync(settings, 'utf8'))['chat.useAgentSkills'], undefined);

  execFileSync(process.execPath, [
    script, 'configure-vscode', '--target-settings', settings, '--remove-local-css', '--apply',
  ], { cwd: root, encoding: 'utf8' });
  const applied = JSON.parse(fs.readFileSync(settings, 'utf8'));
  assert.equal(applied['editor.fontSize'], 15);
  assert.equal(applied['chat.agentSkillsLocations']['.agents/skills'], true);
  assert.equal(applied['chat.agentSkillsLocations']['.github/skills'], true);
  assert.equal(applied['markdown.styles'], undefined);
  assert.equal(applied['chat.useAgentSkills'], true);
  assert.equal(applied['github.copilot.chat.skillTool.enabled'], false);
});

test('Core user baseline apply fails closed on comment-rich JSONC', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-user-jsonc-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const settings = path.join(target, 'settings.json');
  const original = '// keep this comment\n{"editor.fontSize":15}\n';
  fs.writeFileSync(settings, original);
  const script = path.join(
    root, '.github', 'skills', 'plugin-management', 'scripts', 'core-operations.cjs');
  const result = spawnSync(process.execPath, [
    script, 'configure-vscode', '--target-settings', settings, '--apply',
  ], { cwd: root, encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /contain comments/);
  assert.equal(fs.readFileSync(settings, 'utf8'), original);
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
  assert.match(skill, /six activation planes/);
  assert.match(skill, /Step 7 is separately consent-gated/);
  assert.match(skill, /greeting Y covers plugin selection only/);
  assert.doesNotMatch(skill, /summary with four activation planes/);
  for (const plane of [
    'installed',
    'enabled',
    'instruction-loaded',
    'skill-invokable',
    'user-settings',
    'workspace',
  ]) {
    assert.match(`${prompt}\n${skill}`, new RegExp(plane, 'i'));
  }
});

test('generic consent apply registers marketplaces before installing plugins', () => {
  const management = read('.github/skills/plugin-management/SKILL.md');
  const applySection = management.match(/### 2\. Consent-gated apply([\s\S]*?)### 3\. Audit only/)?.[1];
  assert(applySection, 'plugin-management consent-gated apply section is missing');
  const registerIndex = applySection.indexOf('Run `copilot plugin marketplace add`');
  const installIndex = applySection.indexOf('Run `copilot plugin install`');
  assert(registerIndex >= 0, 'consent apply must register new marketplaces');
  assert(installIndex >= 0, 'consent apply must install newly enabled plugins');
  assert(registerIndex < installIndex, 'marketplaces must be registered before plugin installation');
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
test('MSFT direct install is pinned to the managed Microsoft account', () => {
  const content = [
    '.github/skills/install-constellation/SKILL.md',
    '.github/skills/plugin-management/SKILL.md',
  ].map((relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')).join('\n');
  assert.match(content, /fabioc_microsoft\/alex-act-msft/);
  assert.doesNotMatch(content, /fabioc-aloha\/alex-act-msft/);
  assert.match(content, /managed|enterprise member/i);
});
