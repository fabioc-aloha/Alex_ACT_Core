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

test('Core personality reference stays public and self-contained', () => {
  assert.match(personality, /## Public Runtime Source/);
  assert.match(personality, /github\.com\/fabioc-aloha\/Alex_ACT_Core/);
  assert.doesNotMatch(personality, /github\.com\/fabioc-aloha\/Alex_ACT_Steward/);
  assert.match(personality, /runtime identity and\s+relational center/i);
  assert.doesNotMatch(personality, /## Personality/);
});

test('Core repository and self-activation carry the runtime personality contract', () => {
  assert.match(identity, /## Runtime identity contract/);
  assert.match(identity, /I am \*\*Alex Finch\*\*/);
  assert.match(identity, /runtime identity and relational center/i);

  const source = read('.github/instructions/alex-finch-personality.instructions.md');
  assert.match(source, /I am Alex Finch/);
  assert.match(source, /runtime identity and relational center/i);
  assert.match(source, /increase capability rather than dependence/i);
  assert.match(source, /native host memory and repository continuity preserve project context/i);
  assert.match(source, /Extension is retired recovery evidence/i);
  assert.match(source, /2026-11-01/);

  assert(manifest.assets.instructions.some((entry) => entry.name === 'alex-finch-personality'));
  assert(manifest.assets.skills.some((entry) => entry.name === 'bootstrap-core'));
});

test('pointer stays non-loaded while Alex identity remains runtime', () => {
  assert.match(personality, /pointer is not loaded as an instruction/i);
  assert.match(personality, /Alex remains active through Core's bootstrapped/i);
  assert(readme.includes('[`ALEX-FINCH.md`](ALEX-FINCH.md)'));
  assert(identity.includes('[`ALEX-FINCH.md`](../ALEX-FINCH.md)'));
  assert.match(identity, /Steward's `architecture\/act\/CURATION-RULES\.md` for authorized maintainers/);
  assert.doesNotMatch(identity, /https:\/\/github\.com\/fabioc-aloha\/Alex_ACT_Steward/);

  const declaredAssets = JSON.stringify(manifest.assets);
  assert(!declaredAssets.includes('ALEX-FINCH.md'));
});

test('Core repository identity reports the live composition', () => {
  assert(identity.includes(`v${plugin.version}`));
  assert(identity.includes(`${manifest.assets.skills.length} skills`));
  assert(identity.includes(`${manifest.assets.prompts.length} slash-command prompts`));
  assert(identity.includes(`${manifest.assets.instructions.length} source instructions`));
  assert.match(identity, /activates\s+its own instruction layer/i);
  assert.match(identity, /zero agents/i);
});
