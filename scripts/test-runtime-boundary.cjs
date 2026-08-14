'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const managerRoot = path.resolve(root, '..', 'Alex_ACT_Manager');
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
const redirects = {
  'bootstrap-workspace': '/alex-act-manager bootstrap-workspace',
  'configure-vscode': '/alex-act-manager configure-vscode',
  'configure-vscode-verify': '/alex-act-manager configure-vscode-verify',
  'install-constellation': '/alex-act-manager install-constellation',
  'plugin-status': '/alex-act-manager plugin-status',
  'uninstall-constellation': '/alex-act-manager uninstall-constellation',
  'update-plugins': '/alex-act-manager update-plugins',
  convert: '/alex-act-document-tools convert',
};

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

test('Core exposes only baseline skills and namespaced compatibility commands', () => {
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

  assert.equal(manifest.assets.skills.length, 30);
  assert.equal(manifest.assets.instructions.length, 16);
  assert.equal(manifest.assets.prompts.length, 14);
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

test('Core compatibility commands are thin owner redirects', () => {
  for (const [name, target] of Object.entries(redirects)) {
    const prompt = read(`.github/prompts/${name}.prompt.md`);
    assert.match(prompt, new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(prompt, /generic skill tool/i);
    assert.doesNotMatch(prompt, /\.\.\/skills\//);
    assert(prompt.split(/\r?\n/).length <= 30, `${name} redirect exceeds 30 lines`);
  }
});

test('fresh-install guidance routes lifecycle to Manager', () => {
  const readme = read('README.md');
  const install = read('INSTALL.md');
  assert.match(readme, /copilot plugin install alex-act-manager@alex-mall/);
  assert.match(readme, /\/alex-act-manager install-constellation/);
  assert.doesNotMatch(readme, /\/alex-act-core install-constellation/);
  assert.match(install, /\/alex-act-manager install-constellation/);
  assert.match(install, /\/alex-act-manager bootstrap-workspace/);
});

test('Manager distributes fifteen Core instructions plus its greeting trigger', {
  skip: !fs.existsSync(managerRoot),
}, () => {
  const bootstrap = path.join(
    managerRoot, '.github', 'skills', 'install-constellation', 'bootstrap');
  const files = fs.readdirSync(bootstrap)
    .filter((name) => name.endsWith('.instructions.md'))
    .sort();
  const mismatches = [];
  assert.equal(files.length, 16);
  for (const name of files) {
    if (name === 'alex-act-greeting-checkin.instructions.md') {
      const greeting = fs.readFileSync(path.join(bootstrap, name), 'utf8');
      if (!/\/alex-act-manager checkin/.test(greeting)) mismatches.push(name);
      continue;
    }
    const source = path.join(root, '.github', 'instructions', name.replace(/^alex-act-/, ''));
    if (!fs.existsSync(source) || sha256(source) !== sha256(path.join(bootstrap, name))) {
      mismatches.push(name);
    }
  }
  assert.deepEqual(mismatches, []);
});

test('greeting and drift signals route repair to Manager', () => {
  const greeting = fs.readFileSync(path.join(
    managerRoot,
    '.github/skills/install-constellation/bootstrap/alex-act-greeting-checkin.instructions.md'),
  'utf8');
  const health = read('.github/instructions/session-health-monitoring.instructions.md');
  assert.match(greeting, /\/alex-act-manager checkin/);
  assert.match(health, /\/alex-act-manager checkin/);
  assert.doesNotMatch(health, /\.alex-act-bootstrap\.json|installed-plugins/);
});
