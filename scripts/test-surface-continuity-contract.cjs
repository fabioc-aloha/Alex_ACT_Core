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

test('Core surface-continuity keeps defaults native and repository-owned', () => {
  const skill = read('.github/skills/surface-continuity/SKILL.md');
  assert.match(skill, /^description: "Places durable experiences/m);
  assert.match(skill, /native host memory/i);
  assert.match(skill, /\.github\/episodic\//);
  assert.match(skill, /HANDOFF\.md/);
  assert.match(skill, /no default message bus, heartbeat, knowledge base, or cross-host/i);
  assert.match(skill, /normal Core contract/i);
  assert.doesNotMatch(skill, /\bScout\b|scout-message-bus|scout-knowledge-base/i);
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
    assert.match(content, /^lastReviewed: 2026-08-18$/m, artifact);
    assert.match(content, /2026-11-15/, artifact);
  }
});

test('meditation keeps project history local without a default shared transport', () => {
  const meditation = read('.github/skills/meditation/SKILL.md');
  assert.match(meditation, /\.github\/episodic\//);
  assert.match(meditation, /never publish automatically/i);
  assert.doesNotMatch(meditation, /\bScout\b|scout-knowledge-base/i);
});

test('PII guard covers every persistent write without selecting transport', () => {
  const pii = read('.github/instructions/pii-memory-filter.instructions.md');
  assert.match(pii, /every persistent write/i);
  assert.match(pii, /does not\s+select.*transport/is);
  assert.doesNotMatch(pii, /\bScout\b/i);
  assert.doesNotMatch(pii, /C:\\Users\\fabioc|\\OneDrive - [^<\n]+/i);
});

test('Core uses native lifecycle and local continuity without polling', () => {
  const health = read('.github/instructions/session-health-monitoring.instructions.md');
  const awareness = read('.github/instructions/proactive-awareness.instructions.md');
  assert.match(health, /copilot plugin list/);
  assert.doesNotMatch(health, /Manager|alex-act-manager/);
  assert.match(health, /native host memory and repository continuity/i);
  assert.doesNotMatch(`${health}\n${awareness}`, /\bScout\b/i);
  assert.doesNotMatch(`${health}\n${awareness}`, /setInterval|fs\.watch|readdirSync\([^)]*OneDrive/i);
});

test('continuity defaults to native and repository-owned records', () => {
  const skill = read('.github/skills/surface-continuity/SKILL.md');
  assert.match(skill, /native host memory for personal facts/i);
  assert.match(skill, /\.github\/episodic\/`? for durable\s+project summaries/i);
  assert.match(skill, /HANDOFF\.md.*active execution state/i);
  assert.doesNotMatch(skill, /\bScout\b/i);
});
