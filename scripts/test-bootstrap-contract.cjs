const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const instructionsDirectory = path.join(root, '.github', 'instructions');
const bootstrapDirectory = path.join(
  root,
  '.github',
  'skills',
  'install-constellation',
  'bootstrap',
);

function hash(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const bootstrapFiles = fs.readdirSync(bootstrapDirectory)
  .filter((name) => name.endsWith('.instructions.md'))
  .sort();

test('bootstrap contains exactly seventeen instruction files', () => {
  assert.equal(bootstrapFiles.length, 17);
});

test('every bootstrap instruction matches its Core source', () => {
  const mismatches = [];

  for (const bootstrapName of bootstrapFiles) {
    const sourceName = bootstrapName.replace(/^alex-act-/, '');
    const sourcePath = path.join(instructionsDirectory, sourceName);
    const bootstrapPath = path.join(bootstrapDirectory, bootstrapName);

    if (!fs.existsSync(sourcePath) || hash(sourcePath) !== hash(bootstrapPath)) {
      mismatches.push(bootstrapName);
    }
  }

  assert.deepEqual(mismatches, []);
});

test('install skill receipt names every bootstrap file', () => {
  const skill = read('.github/skills/install-constellation/SKILL.md');
  const declared = [...new Set(
    [...skill.matchAll(/"(alex-act-[^"]+\.instructions\.md)"/g)].map((match) => match[1]),
  )].sort();

  assert.deepEqual(declared, bootstrapFiles);
});

test('living metadata reports eighteen instructions and seventeen bootstrap files', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const plugin = JSON.parse(read('plugin.json'));

  assert.equal(manifest.assets.instructions.length, 18);
  assert.match(manifest.description, /seventeen/i);
  assert.doesNotMatch(manifest.description, /sixteen load-bearing/i);
  assert.match(plugin.description, /18 instructions/);
  assert.match(plugin.description, /seventeen load-bearing/i);
});

test('greeting protects the brain spine without workspace capability profiles', () => {
  const greeting = read('.github/instructions/greeting-checkin.instructions.md');
  assert.match(greeting, /alex-act-manager@alex-mall/);
  assert.match(greeting, /alex-act-core@alex-mall/);
  assert.match(greeting, /Manager and Core|Manager \+ Core/i);
  assert.match(greeting, /optional plugins.*(?:do not|never).*unhealthy/is);
  assert.doesNotMatch(greeting, /workspaceProfileState|workspace-unconfigured|Response E/);
  assert.doesNotMatch(greeting, /configure-workspace-capabilities/);
  assert.doesNotMatch(greeting, /Other constellation plugins not installed/);
});
