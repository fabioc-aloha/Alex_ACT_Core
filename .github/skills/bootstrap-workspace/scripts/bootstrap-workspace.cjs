#!/usr/bin/env node
'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function parseArgs(args) {
  const parsed = { apply: false, target: process.cwd() };
  for (let index = 0; index < args.length; index++) {
    const value = args[index];
    if (value === '--apply') parsed.apply = true;
    else if (value === '--target') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error('--target requires a path');
      parsed.target = args[++index];
    } else throw new Error(`unknown argument: ${value}`);
  }
  return parsed;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

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

function planGitignore(target) {
  const file = path.join(target, '.gitignore');
  if (!fs.existsSync(file)) return { action: 'none', file, content: null, changes: [] };
  const original = fs.readFileSync(file, 'utf8');
  const lines = original.split(/\r?\n/);
  const broad = /^(?:\/)?\.vscode\/?$/;
  const index = lines.findIndex((line) => broad.test(line.trim()));
  if (index < 0) return { action: 'none', file, content: original, changes: [] };

  lines.splice(index, 1, '.vscode/*', '!.vscode/settings.json', '!.vscode/markdown-light.css');
  const content = `${lines.join('\n').replace(/\n+$/, '')}\n`;
  return {
    action: 'narrow-vscode-rule',
    file,
    content,
    changes: ['replace broad .vscode ignore with two tracked-file exceptions'],
  };
}

function buildPlan(target, apply) {
  const workspace = path.resolve(target);
  if (!fs.existsSync(workspace) || !fs.statSync(workspace).isDirectory()) {
    throw new Error(`workspace target is not a directory: ${workspace}`);
  }

  const skillRoot = path.resolve(__dirname, '..');
  const cssSource = path.resolve(skillRoot, '..', 'markdown-mermaid', 'markdown-light.css');
  if (!fs.existsSync(cssSource)) throw new Error(`packaging defect: Markdown CSS missing at ${cssSource}`);
  const cssContent = fs.readFileSync(cssSource);
  const cssDestination = path.join(workspace, '.vscode', 'markdown-light.css');
  const cssExists = fs.existsSync(cssDestination);
  const baseline = path.join(skillRoot, 'workspace-settings-baseline.json');
  const settings = mergeWorkspaceSettings(workspace, baseline);
  if (!settings.ok) throw new Error(settings.error);
  const settingsAction = !settings.existed ? 'create' : settings.changes.length ? 'merge' : 'preserve';

  return {
    target: workspace,
    apply,
    css: {
      action: cssExists ? 'preserve' : 'create',
      source: cssSource,
      destination: cssDestination,
      bytes: cssContent.length,
      sha256: sha256(cssContent),
    },
    settings: {
      action: settingsAction,
      destination: settings.settingsFile,
      changes: settings.changes,
      skipped: settings.skipped,
      hadComments: settings.hadComments,
    },
    gitignore: planGitignore(workspace),
    _settingsResult: settings,
    _cssContent: cssContent,
  };
}

function applyPlan(plan) {
  if (plan.css.action === 'create') {
    fs.mkdirSync(path.dirname(plan.css.destination), { recursive: true });
    const temporary = `${plan.css.destination}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, plan._cssContent);
    fs.renameSync(temporary, plan.css.destination);
    if (sha256(fs.readFileSync(plan.css.destination)) !== plan.css.sha256) {
      throw new Error('Markdown CSS hash verification failed after copy');
    }
  }
  if (plan.settings.action !== 'preserve') writeMerged(plan._settingsResult);
  if (plan.gitignore.action !== 'none') writeAtomic(plan.gitignore.file, plan.gitignore.content);
}

function publicPlan(plan) {
  const { _settingsResult, _cssContent, ...output } = plan;
  const { content, ...gitignore } = output.gitignore;
  return { ...output, gitignore };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const plan = buildPlan(args.target, args.apply);
  if (args.apply) applyPlan(plan);
  process.stdout.write(`${JSON.stringify(publicPlan(plan), null, 2)}\n`);
}

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(`ERROR: ${error.message}`); process.exitCode = 1; }
}

module.exports = {
  buildPlan,
  mergeWorkspaceSettings,
  parseArgs,
  planGitignore,
  stripJsonc,
  writeAtomic,
  writeMerged,
};
