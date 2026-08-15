'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), 'utf8');
}

test('Core does not author a greeting overlay', () => {
  assert.equal(fs.existsSync(file('.github/instructions/greeting-checkin.instructions.md')), false);
});

test('Core surface-continuity owns placement while Scout owns shared operations', () => {
  const skill = read('.github/skills/surface-continuity/SKILL.md');
  assert.match(skill, /^description: "Places durable experiences/m);
  assert.match(skill, /native host memory/i);
  assert.match(skill, /\.github\/episodic\//);
  assert.match(skill, /HANDOFF\.md/);
  assert.match(skill, /untrusted/i);
  assert.match(skill, /Scout owns shared-folder message bus/i);
  assert.match(skill, /scout-message-bus/);
  assert.match(skill, /scout-knowledge-base/);
  assert.match(skill, /local fallback/i);
  assert.doesNotMatch(skill, /RFC 8785|JSON Canonicalization Scheme/i);
  assert.doesNotMatch(skill, /\/alex-act-manager continuity-/);
  assert.doesNotMatch(skill, /C:\\Users\\|DefaultAzureCredential|Graph authentication|polling daemon/i);

});

test('edited continuity artifacts carry current review dates and literal falsification deadlines', () => {
  const artifacts = [
    '.github/skills/surface-continuity/SKILL.md',
    '.github/skills/meditation/SKILL.md',
    '.github/instructions/pii-memory-filter.instructions.md',
    '.github/instructions/proactive-awareness.instructions.md',
    '.github/instructions/session-health-monitoring.instructions.md',
  ];
  for (const artifact of artifacts) {
    const content = read(artifact);
    assert.match(content, /^lastReviewed: 2026-08-15$/m, artifact);
    assert.match(content, /2026-11-15/, artifact);
  }
});

test('meditation keeps project history local and requires reviewed Scout deposits', () => {
  const meditation = read('.github/skills/meditation/SKILL.md');
  assert.match(meditation, /\.github\/episodic\//);
  assert.match(meditation, /scout-knowledge-base/);
  assert.match(meditation, /reviewed/i);
  assert.match(meditation, /never publish automatically/i);
});

test('PII guard covers Scout continuity records without selecting transport', () => {
  const pii = read('.github/instructions/pii-memory-filter.instructions.md');
  assert.match(pii, /Scout shared-continuity records/i);
  assert.match(pii, /every persistent write/i);
  assert.match(pii, /does not\s+select.*transport/is);
  assert.doesNotMatch(pii, /C:\\Users\\fabioc|\\OneDrive - [^<\n]+/i);
});

test('Core uses native lifecycle and routes shared continuity to Scout without polling', () => {
  const health = read('.github/instructions/session-health-monitoring.instructions.md');
  const awareness = read('.github/instructions/proactive-awareness.instructions.md');
  assert.match(health, /copilot plugin list/);
  assert.doesNotMatch(health, /Manager|alex-act-manager/);
  assert.match(health, /Scout owns optional shared continuity/i);
  assert.match(awareness, /Scout messages/i);
  assert.match(awareness, /untrusted evidence/i);
  assert.doesNotMatch(`${health}\n${awareness}`, /setInterval|fs\.watch|readdirSync\([^)]*OneDrive/i);
});

test('continuity absence degrades to native and repository-owned fallback', () => {
  const skill = read('.github/skills/surface-continuity/SKILL.md');
  assert.match(skill, /Scout.*unavailable[\s\S]*native host memory/is);
  assert.match(skill, /Scout.*unavailable[\s\S]*\.github\/episodic\//is);
  assert.match(skill, /Scout.*unavailable[\s\S]*HANDOFF\.md/is);
  assert.match(skill, /degraded, not fatal/i);
});
