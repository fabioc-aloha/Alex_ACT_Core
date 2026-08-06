'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('Shared Memory is absent from the default Core runtime', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const skills = manifest.assets.skills.map((entry) => entry.name);
  const instructions = manifest.assets.instructions.map((entry) => entry.name);

  assert.equal(skills.includes('ai-memory-setup'), false);
  assert.equal(skills.includes('memory-management'), false);
  assert.equal(instructions.includes('memory-triggers'), false);
  assert.equal(fs.existsSync(path.join(root, '.github/skills/ai-memory-setup')), false);
  assert.equal(fs.existsSync(path.join(root, '.github/skills/memory-management')), false);
  assert.equal(
    fs.existsSync(path.join(root, '.github/instructions/memory-triggers.instructions.md')),
    false,
  );
  assert.equal(
    fs.existsSync(path.join(
      root,
      '.github/skills/install-constellation/bootstrap/alex-act-memory-triggers.instructions.md',
    )),
    false,
  );
});

test('native persistent memory retains the PII boundary', () => {
  const filter = read('.github/instructions/pii-memory-filter.instructions.md');

  assert.match(filter, /User Memory/);
  assert.match(filter, /Repo Memory/);
  assert.match(filter, /Session Memory/);
  assert.match(filter, /credentials/i);
  assert.match(filter, /health data/i);
  assert.match(filter, /financial data/i);
  assert.doesNotMatch(filter, /Alex_ACT_Memory|Shared Memory|memory-triggers/);
});

test('repository handoff continuity no longer depends on Memory routing', () => {
  const awareness = read('.github/instructions/proactive-awareness.instructions.md');

  assert.match(awareness, /HANDOFF\.md/);
  assert.match(awareness, /\/memories\/session\//);
  assert.doesNotMatch(awareness, /legacy/i);
  assert.doesNotMatch(awareness, /memory-triggers|Alex_ACT_Memory|Shared Memory/);
});
