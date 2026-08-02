# Plugin-Native Workspace Bootstrap Implementation Plan

**Goal:** Add an explicit Core workspace bootstrap that provisions Markdown Preview CSS and safely merges `.vscode/settings.json` for new plugin-native workspaces.

**Architecture:** Promote the proven Edition workspace-bootstrap behavior into a new Core skill and namespaced command. A deterministic Node script previews changes by default and applies only after consent; it preserves existing CSS, existing `markdown.styles`, unrelated JSONC settings, and unrelated `.gitignore` rules. Steward remains the governance source for the migration contract, while Core owns the runtime implementation.

**Tech Stack:** Node.js CommonJS, `node:test`, GitHub Copilot plugin skills/prompts, JSON/JSONC workspace settings, VS Code Markdown Preview CSS.

---

## Current Context

- Legacy `Alex_ACT_Edition` already creates `.vscode/markdown-light.css`, merges `markdown.styles`, preserves heir overrides, refreshes Edition-owned CSS on upgrade, and tests the production bootstrap path.
- Plugin-native `alex-act-core` 0.5.1 has no workspace bootstrap skill or command.
- Core's `configure-vscode` prompt explicitly owns user scope only.
- Steward's plugin-native migration document says Core provides `.vscode/settings.json` guidance separately, but no such Core flow exists.
- The `helper` workspace exposed the gap: its absolute user-level `markdown.styles` path was unsupported, and the two workspace files had to be created manually.
- The exact manual repair and evidence are recorded in `C:\Development\helper\meta\alex-act-upgrade-bootstrap-experience-2026-08-02.md`.

## Behavioral Contract

The new `/alex-act-core bootstrap-workspace` flow must:

1. Target the current workspace by default or an explicit `--target` path.
2. Preview every write before applying it.
3. Require explicit consent before `--apply`.
4. Copy Core's bundled `markdown-mermaid/markdown-light.css` only when `.vscode/markdown-light.css` is absent.
5. Preserve an existing workspace stylesheet byte-for-byte.
6. Add `"markdown.styles": [".vscode/markdown-light.css"]` only when the key is absent.
7. Preserve an existing `markdown.styles` value, including custom arrays and `null`.
8. Parse JSONC input, preserve unrelated settings semantically, and stop on malformed JSON/JSONC.
9. Detect a broad `.vscode/` ignore rule and preview a targeted replacement that tracks only `settings.json` and `markdown-light.css`.
10. Preserve unrelated `.gitignore` rules and unrelated `.vscode` files.
11. Be idempotent on a second run.
12. Report deterministic evidence: resolved paths, settings action, CSS action, ignore action, file size, and SHA-256.

## Task 1: Record the Steward Decision

**Objective:** Create the evidence-gated proposal that authorizes Core to own plugin-native workspace bootstrap.

**Files:**

- Create: `C:\Development\Alex_ACT_Steward\constellation\proposals\core-workspace-bootstrap-2026-08-02.md`
- Reference: `C:\Development\helper\meta\alex-act-upgrade-bootstrap-experience-2026-08-02.md`
- Reference: `C:\Development\Alex_ACT_Edition\test\bootstrap-upgrade-workspace.test.js`

### Step 1: Write the proposal

Include:

- Evidence that Edition already satisfies the contract.
- Evidence that Core has no plugin-native successor.
- Scope boundary: machine configuration stays in `configure-vscode`; repository configuration belongs to `bootstrap-workspace`.
- Alternatives rejected: silently writing repository files from `install-constellation`, using unsupported absolute user paths, and replacing existing project CSS.
- Acceptance criteria matching the Behavioral Contract above.
- Rollback: remove the new prompt/skill and restore Steward's prior migration wording.

### Step 2: Validate Markdown

Run VS Code diagnostics on the proposal and the existing experience report.

Expected: no Markdown errors.

## Task 2: Add Failing Core Contract Tests

**Objective:** Prove Core currently lacks the workspace-bootstrap surface before implementation.

**Files:**

- Modify: `C:\Development\Alex_ACT_Core\scripts\test-plugin-cli-contract.cjs`
- Create: `C:\Development\Alex_ACT_Core\scripts\test-workspace-bootstrap.cjs`
- Modify: `C:\Development\Alex_ACT_Core\package.json`

### Step 1: Add prompt and skill contract assertions

Add a test equivalent to:

```javascript
test('workspace bootstrap has a namespaced prompt and detailed skill contract', () => {
  const prompt = read('.github/prompts/bootstrap-workspace.prompt.md');
  const skill = read('.github/skills/bootstrap-workspace/SKILL.md');

  assert.match(prompt, /bootstrap-workspace/);
  assert.match(prompt, /generic skill tool.*unavailable/i);
  assert.match(prompt, /preview/i);
  assert.match(prompt, /explicit consent/i);
  assert.match(skill, /markdown\.styles/);
  assert.match(skill, /set-if-absent/i);
  assert.match(skill, /preserve/i);
});
```

### Step 2: Add end-to-end test scaffolding

Create temporary-workspace helpers and invoke:

```javascript
execFileSync(process.execPath, [scriptPath, '--target', workspace, '--apply'], {
  cwd: repoRoot,
  stdio: 'pipe',
});
```

Cover these cases:

- Fresh workspace creates both `.vscode` files.
- Existing CSS is preserved byte-for-byte.
- Existing custom `markdown.styles` is preserved.
- Missing `markdown.styles` is added while unrelated JSONC keys survive.
- Malformed JSONC stops before any write.
- Broad `.vscode/` ignore becomes targeted exceptions; unrelated rules survive.
- Second apply is a no-op.
- Dry run writes nothing.

### Step 3: Register the new test

Append `scripts/test-workspace-bootstrap.cjs` to the package test command.

### Step 4: Run tests and verify RED

Run:

```powershell
npm test
```

Expected: failure because the prompt, skill, and script do not yet exist.

## Task 3: Port the JSONC-Safe Merger

**Objective:** Reuse Edition's proven set-if-absent semantics without coupling Core runtime to the Edition repository.

**Files:**

- Implement JSONC merge helpers inside `bootstrap-workspace.cjs`; the initially planned separate helper was consolidated in v0.6.1 to keep the Mall payload within its 100-file Windows limit.
- Test: `C:\Development\Alex_ACT_Core\scripts\test-workspace-bootstrap.cjs`
- Source reference: `C:\Development\Alex_ACT_Edition\.github\scripts\shared\workspace-settings-merger.cjs`

### Step 1: Copy the minimal proven functions

Port:

```javascript
module.exports = {
  mergeWorkspaceSettings,
  writeMerged,
  formatChangeSummary,
};
```

Retain JSONC comment stripping, trailing-comma tolerance, `set-if-absent`, dry-run result objects, and malformed-input failure behavior.

### Step 2: Narrow terminology

Replace Edition-specific "heir baseline" comments with plugin-native workspace terminology. Do not change behavior during the port.

### Step 3: Run merger-focused tests

Run:

```powershell
node --test scripts/test-workspace-bootstrap.cjs
```

Expected: merger tests pass; full bootstrap tests still fail because the command script is absent.

## Task 4: Implement the Deterministic Bootstrap Script

**Objective:** Preview and apply the workspace CSS, settings merge, and selective Git tracking.

**Files:**

- Create: `C:\Development\Alex_ACT_Core\.github\skills\bootstrap-workspace\scripts\bootstrap-workspace.cjs`
- Create: `C:\Development\Alex_ACT_Core\.github\skills\bootstrap-workspace\workspace-settings-baseline.json`
- Reuse: `C:\Development\Alex_ACT_Core\.github\skills\markdown-mermaid\markdown-light.css`
- Test: `C:\Development\Alex_ACT_Core\scripts\test-workspace-bootstrap.cjs`

### Step 1: Add the baseline

```json
{
  "settings": {
    "markdown.styles": [".vscode/markdown-light.css"]
  },
  "mergeMode": {
    "markdown.styles": "set-if-absent"
  }
}
```

### Step 2: Implement argument parsing

Support:

```text
node bootstrap-workspace.cjs [--target <path>] [--apply]
```

Default target: `process.cwd()`.

Default mode: preview only.

Reject unknown arguments and missing target values with a nonzero exit code.

### Step 3: Resolve assets without network access

Resolve the CSS source relative to the installed skill:

```javascript
const cssSource = path.resolve(__dirname, '..', '..', 'markdown-mermaid', 'markdown-light.css');
```

Stop with a packaging-defect message if the source is missing.

### Step 4: Compute the plan before writing

The plan object should contain:

```javascript
{
  target,
  css: { action: 'create' | 'preserve', source, destination, bytes, sha256 },
  settings: { action: 'create' | 'merge' | 'preserve', changes, skipped },
  gitignore: { action: 'none' | 'narrow-vscode-rule', changes },
  apply: boolean,
}
```

Print this plan in preview and apply modes.

### Step 5: Apply atomically after `--apply`

- Create `.vscode/` when needed.
- Copy CSS only when absent.
- Write settings only when the merger reports changes.
- Change `.gitignore` only when a broad `.vscode/` rule hides either managed file.
- Use temporary sibling files plus rename for settings and `.gitignore` writes.
- Verify the destination CSS hash after copy.

### Step 6: Run the end-to-end tests

Run:

```powershell
node --test scripts/test-workspace-bootstrap.cjs
```

Expected: all workspace-bootstrap tests pass.

## Task 5: Add the Skill and Namespaced Prompt

**Objective:** Expose the deterministic script through a consent-gated Core workflow.

**Files:**

- Create: `C:\Development\Alex_ACT_Core\.github\skills\bootstrap-workspace\SKILL.md`
- Create: `C:\Development\Alex_ACT_Core\.github\prompts\bootstrap-workspace.prompt.md`
- Modify: `C:\Development\Alex_ACT_Core\.github\prompts\configure-vscode.prompt.md`
- Modify: `C:\Development\Alex_ACT_Core\.github\prompts\install-constellation.prompt.md`

### Step 1: Write the skill contract

The skill must define:

- Trigger: new plugin-native workspace, missing Markdown Preview theme, or explicit `/alex-act-core bootstrap-workspace`.
- Scope: current repository only.
- Preview first, explicit consent, then `--apply`.
- Set-if-absent settings semantics.
- Existing CSS and custom style preservation.
- Selective `.gitignore` behavior.
- Report and verification requirements.
- No network fetch and no user-settings mutation.

### Step 2: Add the prompt fallback

Follow the resilient command pattern:

```markdown
Use the linked [`bootstrap-workspace`](../skills/bootstrap-workspace/SKILL.md)
skill as the detailed contract. If the generic skill tool is unavailable for a
plugin-shipped skill, continue with the numbered steps below.
```

The numbered fallback must preview, ask consent, apply, and verify without relying on the generic skill tool.

### Step 3: Cross-link existing setup commands

- `configure-vscode`: keep user-scope ownership, then point to `/alex-act-core bootstrap-workspace` for repository settings.
- `install-constellation`: add the workspace bootstrap as an optional namespaced next step, not a silent machine-install side effect.

### Step 4: Run prompt contract tests

Run:

```powershell
node --test scripts/test-plugin-cli-contract.cjs
```

Expected: pass.

## Task 6: Update Core Packaging and Living Metadata

**Objective:** Ensure the new skill, prompt, and script ship in Mall and direct installs.

**Files:**

- Modify: `C:\Development\Alex_ACT_Core\manifest.json`
- Modify: `C:\Development\Alex_ACT_Core\plugin.json`
- Modify: `C:\Development\Alex_ACT_Core\README.md`
- Modify: `C:\Development\Alex_ACT_Core\CHANGELOG.md`

### Step 1: Add manifest assets

- Add `bootstrap-workspace` to `assets.skills`.
- Add `bootstrap-workspace` to `assets.prompts`.
- Confirm the skill directory packaging includes both scripts and the baseline JSON.

### Step 2: Update living counts together

Change active metadata from 41 skills and 13 prompts to 42 skills and 14 prompts in every living surface. Do not rewrite historical changelog entries.

### Step 3: Document the command

Add `/alex-act-core bootstrap-workspace` to README setup and command tables, explicitly distinguishing it from machine-wide instruction bootstrap.

### Step 4: Add the unreleased changelog entry

Record the plugin-native workspace bootstrap, Edition parity, safe merge semantics, and the `helper` experience report as evidence.

## Task 7: Correct Steward's Plugin-Native Migration Contract

**Objective:** Replace vague or contradictory workspace guidance with the actual Core command.

**Files:**

- Modify: `C:\Development\Alex_ACT_Steward\constellation\FLEET-UPGRADE.md`
- Modify: `C:\Development\Alex_ACT_Steward\constellation\FLEET-UPGRADE-TRACKER.md`
- Modify: `C:\Development\Alex_ACT_Steward\constellation\USER-EXPERIENCE.md`

### Step 1: Update adjacent workspace configuration

In Phase 4.5:

- Continue stripping obsolete Copilot Chat discovery keys after user-scope setup.
- Preserve project-specific settings.
- Invoke `/alex-act-core bootstrap-workspace` to ensure `markdown.styles` and CSS exist.
- Delete `.vscode/settings.json` only when no meaningful settings remain **after** the workspace-bootstrap requirement is evaluated.

### Step 2: Update current tracker and onboarding

Add the namespaced command to the current rename-first migration flow and new-workspace setup sequence.

### Step 3: Validate cross-document terminology

Search for claims that Core provides workspace guidance without naming a real command. Replace them with the exact namespaced invocation.

## Task 8: Update the Experience Report

**Objective:** Record the user's decision, root cause, implementation, and verification.

**Files:**

- Modify: `C:\Development\helper\meta\alex-act-upgrade-bootstrap-experience-2026-08-02.md`

### Step 1: Add the exact follow-up

Quote:

> those settings (.vscode folder) should be set up as part of the workspace bootstrap

### Step 2: Document the researched answer

State:

- Edition already did this.
- Plugin-native Core lacked the successor.
- Why machine-wide `install-constellation` is not the correct silent owner.
- The new explicit Core workspace bootstrap and its preservation semantics.
- Exact tests and versions once implementation is complete.

### Step 3: Reconcile earlier recommendations

Replace the earlier recommendation that only offered workspace-local manual setup with the new canonical command.

## Task 9: Run Full Validation

**Objective:** Prove behavior, packaging, docs, and the manual `helper` result agree.

**Files:** All files changed by Tasks 1-8.

### Step 1: Run Core tests

```powershell
Set-Location C:\Development\Alex_ACT_Core
npm test
```

Expected: all tests pass, including production command execution against temporary workspaces.

### Step 2: Run Core contract checks

```powershell
node scripts/test-bootstrap-contract.cjs
node scripts/test-plugin-cli-contract.cjs
node scripts/test-workspace-bootstrap.cjs
```

Expected: exit code 0 for all.

### Step 3: Exercise idempotency against `helper` in preview mode

Run the new script with `--target C:\Development\helper` and without `--apply`.

Expected:

- CSS: preserve.
- Settings: preserve or already current.
- `.gitignore`: already current.
- No files changed.

### Step 4: Validate Markdown and JSON

Run VS Code diagnostics for every touched Markdown and JSON file.

Expected: no errors.

### Step 5: Run final diff checks per repository

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors; only intended files changed. Do not commit or push without explicit user instruction.

## Risks and Tradeoffs

- **JSONC comments:** Edition's current merger preserves settings semantically but rewrites JSON and drops comments. The preview must disclose this before apply. A future AST-preserving editor is out of scope unless user evidence shows comments are common and important.
- **Existing CSS ownership:** Overwriting an existing stylesheet would destroy project intent. Preserve it by default; Core updates only files it can prove it owns in a future receipt-based design.
- **Git ignore policy:** Narrowing `.vscode/` changes repository policy. Preview the exact diff and require consent; never unignore arbitrary `.vscode` files.
- **Scope confusion:** `install-constellation` remains machine-scoped. It may recommend the workspace command but must not run it silently.
- **Count drift:** Adding one skill and one prompt touches multiple living metadata surfaces. Tests should assert the final manifest counts rather than relying on prose alone where practical.

## Completion Criteria

- A fresh plugin-native workspace receives the Markdown CSS and relative setting through one explicit namespaced command.
- Existing workspace CSS, settings, and ignore rules survive according to the contract.
- Dry run, consent, apply, verification, and idempotency are executable and tested.
- Mall packaging contains every runtime resource.
- Steward migration and onboarding docs name the real command.
- The `helper` report records the decision and verified outcome.
