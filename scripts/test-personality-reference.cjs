const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const personality = read('ALEX-FINCH.md');
const readme = read('README.md');
const identity = read('.github/copilot-instructions.md');
const manifest = JSON.parse(read('manifest.json'));
const plugin = JSON.parse(read('plugin.json'));
const bootstrapDirectory = path.join(
  root,
  '.github',
  'skills',
  'install-constellation',
  'bootstrap',
);
const bootstrapCount = fs.readdirSync(bootstrapDirectory)
  .filter((name) => name.endsWith('.instructions.md')).length;

test('Core personality reference points to the canonical Steward source', () => {
  assert.match(personality, /## Canonical Runtime Source/);
  assert.match(personality, /Alex_ACT_Steward\/blob\/main\/brain\/alex-finch\.md/);
  assert.match(personality, /runtime identity and relational center/i);
  assert.doesNotMatch(personality, /## Personality/);
});

test('Core repository and bootstrap carry the runtime personality contract', () => {
  assert.match(identity, /## Runtime identity contract/);
  assert.match(identity, /I am \*\*Alex Finch\*\*/);
  assert.match(identity, /runtime identity and relational center/i);

  const source = read('.github/instructions/alex-finch-personality.instructions.md');
  const mirror = read('.github/skills/install-constellation/bootstrap/alex-act-alex-finch-personality.instructions.md');
  assert.equal(mirror, source);
  assert.match(source, /I am Alex Finch/);
  assert.match(source, /runtime identity and relational center/i);
  assert.match(source, /increase capability rather than dependence/i);
  assert.match(source, /2026-11-01/);

  assert(manifest.assets.instructions.some((entry) => entry.name === 'alex-finch-personality'));
});

test('pointer stays non-loaded while Alex identity remains runtime', () => {
  assert.match(personality, /pointer is not loaded as an instruction/i);
  assert.match(personality, /Alex remains active through Core's bootstrapped/i);
  assert(readme.includes('[`ALEX-FINCH.md`](ALEX-FINCH.md)'));
  assert(identity.includes('[`ALEX-FINCH.md`](../ALEX-FINCH.md)'));

  const declaredAssets = JSON.stringify(manifest.assets);
  assert(!declaredAssets.includes('ALEX-FINCH.md'));
});

test('Core repository identity reports the live composition', () => {
  assert(identity.includes(`v${plugin.version}`));
  assert(identity.includes(`${manifest.assets.skills.length} skills`));
  assert(identity.includes(`${manifest.assets.prompts.length} slash-command prompts`));
  assert(identity.includes(`${manifest.assets.instructions.length} source instructions`));
  assert(identity.includes(`${bootstrapCount} load-bearing instructions`));
  assert.match(identity, /zero agents/i);
});
