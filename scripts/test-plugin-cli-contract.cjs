const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const allowedPluginVerbs = new Set([
  'install',
  'list',
  'marketplace',
  'uninstall',
  'update',
]);

function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('active Core guidance uses only supported Copilot plugin verbs', () => {
  const files = [
    ...walkFiles(path.join(root, '.github')),
    path.join(root, 'README.md'),
    path.join(root, 'manifest.json'),
    path.join(root, 'plugin.json'),
  ].filter((file) => /\.(?:json|md)$/.test(file));

  const violations = [];
  const commandPattern = /copilot plugin\s+([a-z-]+)/g;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(commandPattern)) {
      if (!allowedPluginVerbs.has(match[1])) {
        violations.push(`${path.relative(root, file)}: ${match[0]}`);
      }
    }
  }

  assert.deepEqual(violations, []);
});

test('fresh-install guidance invokes install-constellation explicitly', () => {
  const readme = read('README.md');
  assert.match(readme, /\/alex-act-core install-constellation/);
  assert.doesNotMatch(readme, /greet Core/);
  assert.doesNotMatch(readme, /No slash commands to memorize/);
});

test('install prompt includes separately consented bootstrap', () => {
  const prompt = read('.github/prompts/install-constellation.prompt.md');
  assert.match(prompt, /Step 6/);
  assert.match(prompt, /separate consent/i);
  assert.match(prompt, /copilot plugin list/);
  assert.doesNotMatch(prompt, /copilot plugin info/);
});

test('plugin command prompts survive an unavailable generic skill tool', () => {
  const prompts = [
    '.github/prompts/install-constellation.prompt.md',
    '.github/prompts/meditate.prompt.md',
    '.github/prompts/plugin-status.prompt.md',
    '.github/prompts/status.prompt.md',
    '.github/prompts/update-plugins.prompt.md',
    '.github/prompts/uninstall-constellation.prompt.md',
  ];

  for (const promptPath of prompts) {
    const prompt = read(promptPath);
    assert.match(
      prompt,
      /generic skill tool.*unavailable|do not invoke the generic skill tool/i,
      `${promptPath} needs an explicit skill-tool fallback`,
    );
  }
});
