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

test('bootstrap contains exactly sixteen instruction files', () => {
  assert.equal(bootstrapFiles.length, 16);
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

test('living metadata reports eighteen instructions and sixteen bootstrap files', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const plugin = JSON.parse(read('plugin.json'));

  assert.equal(manifest.assets.instructions.length, 18);
  assert.match(manifest.description, /sixteen/i);
  assert.doesNotMatch(manifest.description, /fifteen load-bearing/i);
  assert.match(plugin.description, /18 ACT instructions/);
  assert.match(plugin.description, /sixteen load-bearing/i);
});
