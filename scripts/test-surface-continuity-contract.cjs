'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const managerRoot = path.resolve(root, '..', 'Alex_ACT_Manager');
const stewardRoot = path.resolve(root, '..', 'Alex_ACT_Steward');

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), 'utf8');
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

test('Manager owns greeting check-in while Core no longer authors it', () => {
  assert.equal(fs.existsSync(file('.github/instructions/greeting-checkin.instructions.md')), false);
  const managerGreeting = path.join(
    managerRoot,
    '.github/skills/install-constellation/bootstrap/alex-act-greeting-checkin.instructions.md');
  assert(fs.existsSync(managerGreeting));
  assert.match(fs.readFileSync(managerGreeting, 'utf8'), /\/alex-act-manager checkin/);
});

test('Core surface-continuity skill owns semantics without transport operations', () => {
  const skill = read('.github/skills/surface-continuity/SKILL.md');
  assert.match(skill, /^description: "Places durable experiences/m);
  assert.match(skill, /native host memory/i);
  assert.match(skill, /\.github\/episodic\//);
  assert.match(skill, /HANDOFF\.md/);
  assert.match(skill, /untrusted/i);
  assert.match(skill, /\/alex-act-manager continuity-(?:status|send|receive|deposit)/);
  assert.match(skill, /local fallback/i);
  assert.match(skill, /RFC 8785|JSON Canonicalization Scheme/i);
  assert.match(skill, /artifact reference[\s\S]*portable/i);
  assert.doesNotMatch(skill, /C:\\Users\\|DefaultAzureCredential|Graph authentication|polling daemon/i);

  const source = path.join(stewardRoot, 'memory/schema/envelope.schema.json');
  const copy = file('.github/skills/surface-continuity/references/envelope.schema.json');
  assert.equal(sha256(copy), sha256(source));
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
    assert.match(content, /^lastReviewed: 2026-08-14$/m, artifact);
    assert.match(content, /2026-11-14/, artifact);
  }
});

test('meditation keeps project history local and requires reviewed Manager deposits', () => {
  const meditation = read('.github/skills/meditation/SKILL.md');
  assert.match(meditation, /\.github\/episodic\//);
  assert.match(meditation, /\/alex-act-manager continuity-deposit/);
  assert.match(meditation, /reviewed/i);
  assert.match(meditation, /never publish automatically/i);
});

test('PII guard covers Manager continuity records without selecting transport', () => {
  const pii = read('.github/instructions/pii-memory-filter.instructions.md');
  assert.match(pii, /Manager continuity records/i);
  assert.match(pii, /every persistent write/i);
  assert.match(pii, /does not\s+select.*transport/is);
  assert.doesNotMatch(pii, /C:\\Users\\fabioc|\\OneDrive - [^<\n]+/i);
});

test('Core health and awareness route operations to Manager without polling', () => {
  const health = read('.github/instructions/session-health-monitoring.instructions.md');
  const awareness = read('.github/instructions/proactive-awareness.instructions.md');
  assert.match(health, /\/alex-act-manager checkin/);
  assert.match(health, /continuity repair/i);
  assert.match(awareness, /pending Manager continuity records/i);
  assert.match(awareness, /untrusted session evidence/i);
  assert.doesNotMatch(`${health}\n${awareness}`, /setInterval|fs\.watch|readdirSync\([^)]*OneDrive/i);
});

test('continuity absence degrades to native and repository-owned fallback', () => {
  const skill = read('.github/skills/surface-continuity/SKILL.md');
  assert.match(skill, /Manager.*unavailable[\s\S]*native host memory/is);
  assert.match(skill, /Manager.*unavailable[\s\S]*\.github\/episodic\//is);
  assert.match(skill, /Manager.*unavailable[\s\S]*HANDOFF\.md/is);
  assert.match(skill, /degraded, not fatal/i);
});
