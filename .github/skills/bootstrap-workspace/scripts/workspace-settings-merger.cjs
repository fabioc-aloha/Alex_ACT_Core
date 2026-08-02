'use strict';

const fs = require('node:fs');
const path = require('node:path');

function stripJsonc(text) {
  let output = '';
  let inString = false;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    const next = text[index + 1];
    if (lineComment) {
      if (character === '\n' || character === '\r') {
        lineComment = false;
        output += character;
      }
      continue;
    }
    if (blockComment) {
      if (character === '*' && next === '/') {
        blockComment = false;
        index++;
      }
      continue;
    }
    if (inString) {
      output += character;
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      output += character;
    } else if (character === '/' && next === '/') {
      lineComment = true;
      index++;
    } else if (character === '/' && next === '*') {
      blockComment = true;
      index++;
    } else {
      output += character;
    }
  }
  return output.replace(/,\s*([}\]])/g, '$1');
}

function mergeWorkspaceSettings(workspaceRoot, baselinePath) {
  let baseline;
  try {
    baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  } catch (error) {
    return { ok: false, error: `Cannot read baseline at ${baselinePath}: ${error.message}` };
  }

  const settingsFile = path.join(workspaceRoot, '.vscode', 'settings.json');
  const existed = fs.existsSync(settingsFile);
  let existing = {};
  let hadComments = false;
  if (existed) {
    const raw = fs.readFileSync(settingsFile, 'utf8');
    hadComments = /\/\/|\/\*/.test(raw);
    try {
      existing = JSON.parse(stripJsonc(raw)) || {};
    } catch (error) {
      return { ok: false, error: `${settingsFile} is not valid JSON/JSONC: ${error.message}` };
    }
  }

  const merged = { ...existing };
  const changes = [];
  const skipped = [];
  for (const [key, desired] of Object.entries(baseline.settings || {})) {
    const mode = baseline.mergeMode?.[key] || 'enforce';
    if (mode === 'set-if-absent' && Object.hasOwn(merged, key)) {
      skipped.push({ key, mode, reason: 'workspace-has-key' });
      continue;
    }
    if (JSON.stringify(merged[key]) !== JSON.stringify(desired)) {
      changes.push({ key, from: merged[key], to: desired });
      merged[key] = desired;
    }
  }

  return { ok: true, settingsFile, existed, hadComments, changes, skipped, merged };
}

function writeAtomic(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(temporary, content, 'utf8');
  fs.renameSync(temporary, file);
}

function writeMerged(result) {
  writeAtomic(result.settingsFile, `${JSON.stringify(result.merged, null, 2)}\n`);
}

module.exports = { mergeWorkspaceSettings, stripJsonc, writeAtomic, writeMerged };
