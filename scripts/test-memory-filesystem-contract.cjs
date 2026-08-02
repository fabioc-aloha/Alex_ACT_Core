'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('Memory client stays filesystem-native and validates every write', () => {
  const setup = read('.github/skills/ai-memory-setup/SKILL.md');
  const management = read('.github/skills/memory-management/SKILL.md');

  assert.match(setup, /filesystem client/i);
  assert.match(setup, /atomic/i);
  assert.match(setup, /npm run check/);
  assert.match(setup, /Git synchronization remain(?:s)? separate/i);
  assert.doesNotMatch(setup, /alex-memory-mcp|memory\.knowledge\.search|memory\.insights\.record/);

  assert.match(management, /Alex_ACT_Memory/);
  assert.match(management, /ai-memory-setup/);
  assert.match(management, /project-agnostic/i);
});

test('shared Memory writes cannot bypass project-isolation routing', () => {
  const triggers = read('.github/instructions/memory-triggers.instructions.md');
  const setup = read('.github/skills/ai-memory-setup/SKILL.md');

  assert.match(triggers, /every shared Memory write/i);
  assert.match(triggers, /route through[\s\S]{0,100}ai-memory-setup/i);
  assert.match(triggers, /project-specific names, paths, identifiers, and stack details/i);

  assert.match(setup, /project-boundary stripping/i);
  assert.match(setup, /project or product names/i);
  assert.match(setup, /file paths/i);
  assert.match(setup, /domain-specific identifiers/i);
  assert.match(setup, /stack details/i);
  assert.match(setup, /direct file write/i);
  assert.match(setup, /refuse/i);
});

test('cross-project isolation has one detailed owner instead of a standalone instruction', () => {
  const manifest = JSON.parse(read('manifest.json'));
  const instructionNames = manifest.assets.instructions.map((entry) => entry.name);

  assert.equal(instructionNames.includes('cross-project-isolation'), false);
  assert.equal(
    fs.existsSync(path.join(root, '.github/instructions/cross-project-isolation.instructions.md')),
    false,
  );
});
