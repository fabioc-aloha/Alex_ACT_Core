#!/usr/bin/env node
'use strict';

const fs = require('node:fs');

const DEFAULT_URL = 'https://raw.githubusercontent.com/fabioc-aloha/Alex_Skill_Mall/main/.github/plugin/marketplace.json';

function parseArgs(args) {
  const parsed = { file: null, url: DEFAULT_URL, plugins: [] };
  for (let index = 0; index < args.length; index++) {
    const value = args[index];
    if (value === '--file' || value === '--url' || value === '--plugins') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${value} requires a value`);
      const target = value.slice(2);
      parsed[target] = args[++index];
    } else throw new Error(`unknown argument: ${value}`);
  }
  parsed.plugins = String(parsed.plugins).split(',').map((name) => name.trim()).filter(Boolean);
  if (!parsed.plugins.length) throw new Error('--plugins requires at least one plugin name');
  return parsed;
}

async function loadMarketplace(args) {
  if (args.file) return JSON.parse(fs.readFileSync(args.file, 'utf8'));
  const response = await fetch(args.url, {
    headers: { 'user-agent': 'alex-act-core-marketplace-version-check' },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`marketplace fetch failed: HTTP ${response.status}`);
  return response.json();
}

function selectRecords(marketplace, requested) {
  if (!Array.isArray(marketplace.plugins)) throw new Error('marketplace plugins array is missing');
  return requested.map((name) => {
    const matches = marketplace.plugins.filter((plugin) => plugin.name === name);
    if (!matches.length) throw new Error(`plugin record not found: ${name}`);
    if (matches.length > 1) throw new Error(`duplicate plugin records found: ${name}`);
    const { version, source } = matches[0];
    if (!version || !source) throw new Error(`plugin record is incomplete: ${name}`);
    return { name, version, source };
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const marketplace = await loadMarketplace(args);
  process.stdout.write(`${JSON.stringify(selectRecords(marketplace, args.plugins), null, 2)}\n`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`ERROR: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { DEFAULT_URL, loadMarketplace, parseArgs, selectRecords };
