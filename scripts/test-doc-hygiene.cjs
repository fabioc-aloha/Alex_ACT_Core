const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const skillPath = path.join(root, '.github', 'skills', 'doc-hygiene', 'SKILL.md');

test('doc-hygiene routes code documentation by layer', () => {
  const skill = fs.readFileSync(skillPath, 'utf8');

  assert.match(skill, /^## Code Documentation Ladder$/m);
  for (const layer of [
    'Inline comment',
    'Adoption guide',
    'Technical reference',
    'Changelog',
    'Decision record',
  ]) {
    assert.match(skill, new RegExp(`\\| \\*\\*${layer}\\*\\* \\|`));
  }
});

test('doc-hygiene makes load-bearing code claims executable', () => {
  const skill = fs.readFileSync(skillPath, 'utf8');

  assert.match(skill, /comments explain why and invariants/i);
  assert.match(skill, /change or delete the comment in the same change/i);
  assert.match(skill, /load-bearing documentation claim[^\n]*executable check/i);
  assert.match(skill, /origin, path, exit-code, or trust-boundary semantics/i);
  assert.match(skill, /detached (?:bundle|starter|template)/i);
  assert.match(skill, /Do not narrate what each line does/i);
});

test('doc-hygiene carries a dated falsifier for the ladder', () => {
  const skill = fs.readFileSync(skillPath, 'utf8');

  assert.match(skill, /lastReviewed: 2026-08-07/);
  assert.match(skill, /2026-11-07/);
});
