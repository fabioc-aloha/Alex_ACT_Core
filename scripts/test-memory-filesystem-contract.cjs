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
