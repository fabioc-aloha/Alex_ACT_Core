'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const removedSkills = [
  'bootstrap-workspace',
  'install-constellation',
  'plugin-management',
  'uninstall-constellation',
  'update-plugins',
  'docx-to-md',
  'html-to-md',
  'md-to-eml',
  'md-to-html',
  'md-to-txt',
  'md-to-word',
];
const redirects = { convert: '/alex-act-document-tools convert' };

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function copyBootstrapPackage(target) {
  for (const relativePath of [
    'plugin.json',
    'manifest.json',
    '.github/instructions',
    '.github/skills/bootstrap-core',
  ]) {
    const source = path.join(root, relativePath);
    const destination = path.join(target, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(source, destination, { recursive: true });
  }
}

test('Core bootstrap previews, applies, verifies, and repairs all canonical instructions', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-bootstrap-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const instructions = path.join(target, 'instructions');
  fs.mkdirSync(instructions);
  fs.writeFileSync(path.join(instructions, 'user-owned.instructions.md'), 'preserve\n');
  const script = path.join(
    root, '.github', 'skills', 'bootstrap-core', 'scripts', 'bootstrap-core.cjs');

  const preview = JSON.parse(execFileSync(process.execPath, [
    script, '--target-instructions', instructions,
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(preview.apply, false);
  assert.equal(preview.coreVersion, '3.1.1');
  assert.equal(preview.expectedFiles, 16);
  assert.equal(preview.files.filter((file) => file.action === 'create').length, 16);
  assert.equal(fs.readdirSync(instructions).length, 1);

  const applied = JSON.parse(execFileSync(process.execPath, [
    script, '--target-instructions', instructions, '--apply',
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(applied.apply, true);
  const receipt = JSON.parse(fs.readFileSync(path.join(
    instructions, '.alex-act-core-bootstrap.json'), 'utf8'));
  assert.equal(receipt.schemaVersion, 2);
  assert.equal(receipt.bootstrappedBy, 'alex-act-core');
  assert.equal(receipt.files.length, 16);
  assert(receipt.files.every((file) => file.owner === 'alex-act-core'));
  for (const file of receipt.files) {
    const source = path.join(root, '.github', 'instructions', file.name.replace(/^alex-act-/, ''));
    const destination = path.join(instructions, file.name);
    assert.equal(sha256(source), sha256(destination), file.name);
  }
  assert.equal(fs.readFileSync(path.join(instructions, 'user-owned.instructions.md'), 'utf8'),
    'preserve\n');

  const receiptHash = sha256(path.join(instructions, '.alex-act-core-bootstrap.json'));
  execFileSync(process.execPath, [
    script, '--target-instructions', instructions, '--apply',
  ], { cwd: root, encoding: 'utf8' });
  assert.equal(sha256(path.join(instructions, '.alex-act-core-bootstrap.json')), receiptHash,
    'a no-op apply must preserve receipt bytes');

  const damaged = receipt.files.find((file) => file.name.includes('act-pass')).name;
  fs.writeFileSync(path.join(instructions, damaged), 'damaged\n');
  const repair = JSON.parse(execFileSync(process.execPath, [
    script, '--target-instructions', instructions,
  ], { cwd: root, encoding: 'utf8' }));
  assert.deepEqual(repair.files.filter((file) => file.action === 'replace').map((file) => file.name),
    [damaged]);
  execFileSync(process.execPath, [
    script, '--target-instructions', instructions, '--apply',
  ], { cwd: root, encoding: 'utf8' });
  assert.equal(sha256(path.join(instructions, damaged)), sha256(path.join(
    root, '.github', 'instructions', damaged.replace(/^alex-act-/, ''))));
});

test('Core bootstrap detects nested workspace instruction overlap', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-bootstrap-overlap-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const instructions = path.join(target, 'instructions');
  const workspace = path.join(target, 'workspace');
  fs.mkdirSync(instructions);
  fs.mkdirSync(path.join(workspace, 'nested'), { recursive: true });
  fs.writeFileSync(path.join(workspace, 'nested', 'act-pass.instructions.md'), 'overlap\n');
  const script = path.join(
    root, '.github', 'skills', 'bootstrap-core', 'scripts', 'bootstrap-core.cjs');
  const preview = JSON.parse(execFileSync(process.execPath, [
    script, '--target-instructions', instructions,
    '--workspace-instructions', workspace,
  ], { cwd: root, encoding: 'utf8' }));
  assert(preview.overlap.includes('alex-act-act-pass.instructions.md'));
});

test('Core bootstrap removal rejects unsafe receipts and verifies owned cleanup', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-bootstrap-remove-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const instructions = path.join(target, 'instructions');
  fs.mkdirSync(instructions);
  const script = path.join(
    root, '.github', 'skills', 'bootstrap-core', 'scripts', 'bootstrap-core.cjs');
  execFileSync(process.execPath, [
    script, '--target-instructions', instructions, '--apply',
  ], { cwd: root, encoding: 'utf8' });
  const receiptPath = path.join(instructions, '.alex-act-core-bootstrap.json');
  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const modified = receipt.files.find((file) => file.name.includes('act-pass'));
  fs.writeFileSync(path.join(instructions, modified.name), 'user-modified\n');
  fs.writeFileSync(path.join(instructions, 'user-owned.instructions.md'), 'preserve\n');

  const removal = JSON.parse(execFileSync(process.execPath, [
    script, '--target-instructions', instructions, '--remove', '--apply',
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(removal.verification.removed, 15);
  assert.deepEqual(removal.verification.preservedModified, [modified.name]);
  assert.equal(removal.verification.receiptRemoved, false);
  assert.equal(fs.existsSync(receiptPath), true);
  assert.equal(fs.readFileSync(path.join(instructions, modified.name), 'utf8'), 'user-modified\n');
  assert.equal(fs.readFileSync(path.join(instructions, 'user-owned.instructions.md'), 'utf8'),
    'preserve\n');

  receipt.files[0].name = '../outside.txt';
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  assert.throws(() => execFileSync(process.execPath, [
    script, '--target-instructions', instructions, '--remove',
  ], { cwd: root, encoding: 'utf8', stdio: 'pipe' }), /receipt/i);

  const cleanInstructions = path.join(target, 'clean-instructions');
  fs.mkdirSync(cleanInstructions);
  execFileSync(process.execPath, [
    script, '--target-instructions', cleanInstructions, '--apply',
  ], { cwd: root, encoding: 'utf8' });
  const cleanRemoval = JSON.parse(execFileSync(process.execPath, [
    script, '--target-instructions', cleanInstructions, '--remove', '--apply',
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(cleanRemoval.verification.removed, 16);
  assert.deepEqual(cleanRemoval.verification.preservedModified, []);
  assert.equal(cleanRemoval.verification.receiptRemoved, true);
  assert.equal(fs.readdirSync(cleanInstructions).length, 0);
});

test('Core bootstrap validates manifest parity and works from an isolated delivered copy', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-bootstrap-delivered-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const delivered = path.join(target, 'alex-act-core');
  const instructions = path.join(target, 'instructions');
  copyBootstrapPackage(delivered);
  fs.mkdirSync(instructions);
  const script = path.join(
    delivered, '.github', 'skills', 'bootstrap-core', 'scripts', 'bootstrap-core.cjs');
  const applied = JSON.parse(execFileSync(process.execPath, [
    script, '--target-instructions', instructions, '--apply',
  ], { cwd: target, encoding: 'utf8' }));
  assert.equal(applied.expectedFiles, 16);
  assert.equal(applied.verification.destinationHashes, 16);

  const manifestPath = path.join(delivered, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.assets.instructions.pop();
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  assert.throws(() => execFileSync(process.execPath, [
    script, '--target-instructions', path.join(target, 'second'),
  ], { cwd: target, encoding: 'utf8', stdio: 'pipe' }), /manifest.*instruction|instruction.*manifest/i);
});

test('Core project bootstrap previews, applies, preserves, and becomes idempotent', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-project-bootstrap-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const repository = path.join(target, 'repo');
  fs.mkdirSync(repository);
  fs.writeFileSync(path.join(repository, 'README.md'), 'project-owned\n');
  const script = path.join(
    root, '.github', 'skills', 'bootstrap-project', 'scripts', 'bootstrap-project.cjs');

  const preview = JSON.parse(execFileSync(process.execPath, [
    script, '--repository-root', repository,
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(preview.apply, false);
  assert.equal(preview.classification, 'git-absent');
  assert(preview.creates.some((entry) => entry.relativePath === 'AGENTS.md'));
  assert.equal(preview.settings.action, 'create');
  assert.equal(fs.existsSync(path.join(repository, 'AGENTS.md')), false);

  const applied = JSON.parse(execFileSync(process.execPath, [
    script, '--repository-root', repository, '--apply',
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(applied.verification.pendingCreates, 0);
  assert.equal(fs.readFileSync(path.join(repository, 'README.md'), 'utf8'), 'project-owned\n');
  assert.equal(fs.existsSync(path.join(repository, 'MEMORY.md')), false);
  const agents = fs.readFileSync(path.join(repository, 'AGENTS.md'), 'utf8');
  assert.match(agents, /HANDOFF\.md/);
  assert.doesNotMatch(agents, /Manager|alex-act-manager/i);
  assert.match(agents, /Configure Scout explicitly when work must\s+cross projects\./);
  assert.match(agents, /optional surface bridge only when host-specific agent\s+surface integration is needed\./);
  const settings = JSON.parse(fs.readFileSync(path.join(repository, '.vscode', 'settings.json')));
  assert.equal(settings['chat.agentSkillsLocations']['.github/skills'], true);
  assert.deepEqual(settings['markdown.styles'], ['.vscode/markdown-light.css']);
  assert.equal(settings['editor.formatOnSave'], true);
  assert.equal(settings['diffEditor.hideUnchangedRegions.enabled'], true);
  assert.equal(settings['files.eol'], '\n');
  assert.equal(settings['files.watcherExclude']['**/node_modules/**'], true);
  assert.equal(settings['search.exclude']['**/node_modules'], true);
  assert.equal(settings['terminal.integrated.defaultProfile.windows'], 'pwsh');
  assert.equal(settings['git.autofetch'], true);
  assert.equal(settings['markdown.updateLinksOnFileMove.enabled'], 'always');

  const second = JSON.parse(execFileSync(process.execPath, [
    script, '--repository-root', repository,
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(second.creates.length, 0);
});

test('Core project bootstrap preserves custom settings and blocks agent conflicts', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-project-preserve-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const repository = path.join(target, 'repo');
  fs.mkdirSync(path.join(repository, '.vscode'), { recursive: true });
  fs.writeFileSync(path.join(repository, '.vscode', 'settings.json'), JSON.stringify({
    'editor.fontSize': 17,
    'markdown.styles': ['custom.css'],
    note: 'literal,}',
  }, null, 2));
  fs.writeFileSync(path.join(repository, '.vscode', 'markdown-light.css'), 'custom css\n');
  fs.writeFileSync(path.join(repository, 'AGENT.md'), '# Singular\n');
  fs.writeFileSync(path.join(repository, 'AGENTS.md'), '# Divergent\n');
  const script = path.join(
    root, '.github', 'skills', 'bootstrap-project', 'scripts', 'bootstrap-project.cjs');
  const preview = JSON.parse(execFileSync(process.execPath, [
    script, '--repository-root', repository,
  ], { cwd: root, encoding: 'utf8' }));
  assert.equal(preview.classification, 'agent-source-conflict');
  assert.equal(preview.blocked, true);
  assert.throws(() => execFileSync(process.execPath, [
    script, '--repository-root', repository, '--apply',
  ], { cwd: root, encoding: 'utf8', stdio: 'pipe' }), /conflict/i);
  assert.equal(JSON.parse(fs.readFileSync(
    path.join(repository, '.vscode', 'settings.json')))['editor.fontSize'], 17);
  assert.equal(JSON.parse(fs.readFileSync(
    path.join(repository, '.vscode', 'settings.json'))).note, 'literal,}');
  assert.equal(fs.readFileSync(path.join(repository, '.vscode', 'markdown-light.css'), 'utf8'),
    'custom css\n');
});

test('Core project bootstrap preserves JSONC strings that resemble trailing commas', (t) => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'core-project-jsonc-string-'));
  t.after(() => fs.rmSync(target, { recursive: true, force: true }));
  const repository = path.join(target, 'repo');
  fs.mkdirSync(path.join(repository, '.vscode'), { recursive: true });
  fs.writeFileSync(path.join(repository, '.vscode', 'settings.json'), [
    '{',
    '  "note": "literal,}"',
    '}',
  ].join('\n'));
  const script = path.join(
    root, '.github', 'skills', 'bootstrap-project', 'scripts', 'bootstrap-project.cjs');

  execFileSync(process.execPath, [
    script, '--repository-root', repository, '--apply',
  ], { cwd: root, encoding: 'utf8' });
  const settings = JSON.parse(fs.readFileSync(path.join(repository, '.vscode', 'settings.json')));
  assert.equal(settings.note, 'literal,}');
  assert.equal(settings['chat.agentSkillsLocations']['.github/skills'], true);
});

test('Core declares self-activation and no Manager lifecycle redirects', () => {
  assert.equal(fs.existsSync(path.join(root, '.github', 'skills', 'bootstrap-core', 'SKILL.md')), true);
  assert.equal(fs.existsSync(path.join(root, '.github', 'prompts', 'bootstrap-core.prompt.md')), true);
  for (const name of [
    'bootstrap-workspace', 'configure-vscode', 'configure-vscode-verify',
    'install-constellation', 'plugin-status', 'uninstall-constellation', 'update-plugins',
  ]) {
    assert.equal(fs.existsSync(path.join(root, '.github', 'prompts', `${name}.prompt.md`)), false,
      `Core still declares Manager redirect ${name}`);
  }
});

test('Core 3.1.1 release metadata is final before tagging', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const plugin = JSON.parse(read('plugin.json'));
  const packageJson = JSON.parse(read('package.json'));
  const changelog = read('CHANGELOG.md');
  const readme = read('README.md');
  const install = read('INSTALL.md');

  assert.equal(manifest.version, '3.1.1');
  assert.equal(plugin.version, '3.1.1');
  assert.equal(packageJson.version, '3.1.1');
  assert.equal(manifest.status, 'released');
  assert.equal(manifest.distribution.status, 'published');
  assert.equal(manifest.distribution.published_version, '3.1.1');
  assert.equal(manifest.nextRelease, undefined);
  assert.equal(manifest.candidateVersion, undefined);
  assert.match(changelog, /## \[Unreleased\][\s\S]*## \[3\.1\.1\] - 2026-08-17[\s\S]*## \[3\.1\.0\] - 2026-08-17/);
  assert.match(readme, /published version.*3\.1\.1/i);
  assert.match(install, /\| Core \| `3\.1\.1` \|/);
  assert.match(install, /\| Enterprise \| `1\.1\.0` \|/);
  assert.doesNotMatch(install, /Manager|alex-act-manager/i);
  assert.match(install, /## Published Versions/);
  assert.doesNotMatch(install, /Not Yet Published/);
  assert.match(changelog, /update Manager to `1\.2\.0` first[\s\S]*update Core to `2\.0\.0`/i);
});

test('Core README documents the constellation installation and dependency contract', () => {
  const readme = read('README.md');

  for (const plugin of [
    'alex-act-core',
    'alex-act-illustrator-plugin',
    'alex-act-document-tools',
    'alex-act-ai-operations',
    'alex-act-enterprise',
    'alex-act-msft',
  ]) {
    assert(readme.includes(`\`${plugin}\``), `README must list ${plugin}`);
  }
  assert.match(readme, /manifests declare no dependency on Core or on one another/i);
  assert.match(readme, /Close all VS Code windows before installing or updating a plugin/i);
  assert.match(readme, /copilot plugin install alex-act-core@alex-mall/);
  assert.match(readme, /copilot plugin install alex-act-msft@agency-playground/);
});

test('Core exposes self-activation, baseline skills, and one conversion redirect', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const sourceSkills = fs.readdirSync(path.join(root, '.github', 'skills'), {
    withFileTypes: true,
  }).filter((entry) => entry.isDirectory()
    && fs.existsSync(path.join(root, '.github', 'skills', entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
    .sort();
  const sourcePrompts = fs.readdirSync(path.join(root, '.github', 'prompts'))
    .filter((name) => name.endsWith('.prompt.md'))
    .sort();

  assert.equal(manifest.assets.skills.length, 32);
  assert.equal(manifest.assets.instructions.length, 16);
  assert.equal(manifest.assets.prompts.length, 9);
  assert.deepEqual(manifest.assets.skills.map((entry) => entry.name).sort(), sourceSkills);
  assert.deepEqual(manifest.assets.prompts.map((entry) => `${entry.name}.prompt.md`).sort(),
    sourcePrompts);
  const sharedRuntime = path.join(root, '.github', 'scripts', 'shared');
  assert.equal(fs.existsSync(sharedRuntime)
    ? fs.readdirSync(sharedRuntime).length
    : 0, 0);
  for (const name of removedSkills) {
    assert.equal(fs.existsSync(path.join(root, '.github', 'skills', name, 'SKILL.md')), false,
      `${name} must be owned outside Core`);
  }
});

test('meditation routes reusable project capabilities to consented local authoring', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const skills = manifest.assets.skills.map((entry) => entry.name);
  const meditation = read('.github/skills/meditation/SKILL.md');
  const prompt = read('.github/prompts/meditate.prompt.md');
  const authoring = read('.github/skills/project-capability-authoring/SKILL.md');
  const platformAwareness = read('.github/skills/platform-awareness/SKILL.md');

  assert.equal(skills.includes('mcp-builder'), false);
  assert.equal(skills.includes('project-capability-authoring'), true);
  assert.match(meditation, /project-capability-authoring/);
  assert.match(meditation, /explicit user (?:request|approval)/i);
  assert.match(prompt, /project-capability-authoring/);
  assert.match(authoring, /\.github\/skills\//);
  assert.match(authoring, /scripts\//);
  assert.match(authoring, /explicit user approval/i);
  assert.match(authoring, /should-fire/i);
  assert.match(authoring, /should-not-fire/i);
  assert.match(authoring, /does not change Core,\s*build MCP servers/i);
  assert.doesNotMatch(authoring, /FastMCP|MCP SDK|McpServer/);
  assert.doesNotMatch(platformAwareness, /mcp-builder/);
});

test('Core keeps bridge-neutral cross-surface safeguards without owning adapters', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const skills = manifest.assets.skills.map((entry) => entry.name);
  const continuity = read('.github/skills/surface-continuity/SKILL.md');

  assert.equal(skills.includes('surface-communication'), false);
  assert.equal(fs.existsSync(path.join(
    root, '.github', 'skills', 'surface-communication', 'SKILL.md')), false);
  assert.match(continuity, /explicit user approval/i);
  assert.match(continuity, /correlation ID/i);
  assert.match(continuity, /untrusted/i);
  assert.match(continuity, /optional surface bridge/i);
  assert.doesNotMatch(continuity, /send-task|send-result|ChatGPT Desktop|GitHub Copilot app/i);
});

test('Core planning and git guidance require explicit approval before committing', () => {
  const planning = read('.github/skills/plan/SKILL.md');
  const git = read('.github/skills/git-workflow/SKILL.md');

  assert.match(planning, /explicit user approval/i);
  assert.doesNotMatch(planning, /Commit after every task/i);
  assert.match(planning, /## Would Revise If/);
  assert.match(git, /explicit user approval/i);
  assert.doesNotMatch(git, /ALWAYS commit before risky operations/i);
});

test('Core retains only the thin Document Tools compatibility redirect', () => {
  for (const [name, target] of Object.entries(redirects)) {
    const prompt = read(`.github/prompts/${name}.prompt.md`);
    assert.match(prompt, new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(prompt, /generic skill tool/i);
    assert.doesNotMatch(prompt, /\.\.\/skills\//);
    assert(prompt.split(/\r?\n/).length <= 30, `${name} redirect exceeds 30 lines`);
  }
});

test('fresh-install guidance activates Core directly and uses native lifecycle commands', () => {
  const readme = read('README.md');
  const install = read('INSTALL.md');
  assert.match(readme, /copilot plugin install alex-act-core@alex-mall/);
  assert.match(readme, /\/alex-act-core bootstrap-core/);
  assert.match(readme, /native Copilot CLI/i);
  assert.doesNotMatch(readme, /alex-act-manager|Alex_ACT_Manager/);
  assert.match(install, /\/alex-act-core bootstrap-core/);
  assert.match(install, /copilot plugin update alex-act-core/);
  assert.doesNotMatch(install, /alex-act-manager|Alex_ACT_Manager/);
});

test('Core activation has one owner and no greeting overlay dependency', () => {
  assert.equal(fs.readdirSync(path.join(root, '.github', 'instructions'))
    .filter((name) => name.endsWith('.instructions.md')).length, 16);
  const health = read('.github/instructions/session-health-monitoring.instructions.md');
  assert.doesNotMatch(health, /Manager|alex-act-manager/);
  assert.match(health, /copilot plugin list/);
  assert.doesNotMatch(health, /\.alex-act-bootstrap\.json|installed-plugins/);
});
