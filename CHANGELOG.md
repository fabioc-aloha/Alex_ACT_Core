# Changelog

All notable changes to `alex-act-core` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added — Batch 10: Sundries cluster (2026-07-30)

Eleven artifacts closing the Both-classified inventory: 4 always-on instructions + 3 skills + 4 slash-command prompts. Completes Core's core content set (Both-classified inventory fully ported).

**Instructions (4)**:

- **`agent-delegation.instructions.md`** (`applyTo: **/*agent*,**/*delegate*,**/*subagent*,...`) — Delegate mechanical work (markdown authoring, diagram rendering, file conversion, assembly) to worker subagents so the parent session keeps capacity for reasoning. Names the workers, the delegation decision table, and self-check discipline before authoring mechanical output directly.
- **`code-review.instructions.md`** (`applyTo: **/*review*,**/*audit*,**/*pr*`) — Code review quality gate protocols and feedback guidelines. Routes to `code-review` skill for the systematic-review body.
- **`risk-analysis.instructions.md`** (`applyTo: **/*risk*,**/*plan*,**/*assess*,...`) — Risk assessment via probability×impact scoring. Applied to curation decisions (skill acceptance, release gating). Distinguishes reversible from expensive-to-undo decisions.
- **`status-reporting.instructions.md`** (`applyTo: **/*status*,**/*report*,**/*update*`) — Routing pointer to `status-reporting` skill for stakeholder-friendly project updates.

**Skills (3)**:

- **`ai-memory-setup/SKILL.md`** — Resolve and use the `Alex_ACT_Memory` sibling repository as shared memory bus without silently cloning, syncing, or exposing protected data. Covers announcements, feedback, shared knowledge, explicit setup. Heirs who don't use the Memory sibling can safely ignore.
- **`code-review/SKILL.md`** — Systematic code review for correctness, security, and growth — not just style enforcement. Composes with `security-and-hardening` (Batch 6) for OWASP-scoped review and `adversarial-review` instruction (Batch 1) for structured skepticism.
- **`status-reporting/SKILL.md`** — Create stakeholder-friendly project status updates and progress reports. Audience-adapted. Composes with `communication-craft` (Batch 4) for So-What/What/Now-What audience lead.

**Prompts (4)**:

- **`banner.prompt.md`** (`/banner`) — User-invokable trigger for SVG banner generation via the `svg-banner` skill (Batch 9). Produces 1200×320 branded banner using `.github/config/{banner-brand,brand-palette}.json`.
- **`configure-vscode.prompt.md`** (`/configure-vscode`) — Apply VS Code user-scope baseline settings for policy compliance. Heirs adapt for their project's baseline config.
- **`configure-vscode-verify.prompt.md`** (`/configure-vscode-verify`) — Read-only audit of user-level VS Code/Copilot settings compliance. Companion to `/configure-vscode`.
- **`status.prompt.md`** (`/status`) — Terse read-only project orientation report: identity, git state, HANDOFF.md continuity, optional brain-QA health, announcements. Audience-adapted output leading with material state.

**Adaptation applied**:

- 9 of 11 files ported verbatim.
- `risk-analysis.instructions.md`: (a) rewrote "Applied to Supervisor curation: accepting a bad skill is reversible... Shipping a broken release to 5+ heirs is expensive to undo" to "Applied to curation work: ... Shipping a broken release to consumers is expensive to undo" — heirs don't necessarily have downstream heirs; generalized; (b) reframed `operations/ledgers/brain-qa-changelog.md` tracking ref as "your project's audit trail (Alex ACT itself uses ...)".
- `status.prompt.md`: substantially rewritten from Steward-specific to project-generic. Original said "Produce a terse read-only orientation report for `Alex_ACT_Steward`" and hardcoded `node scripts/brain-qa.cjs` invocations. Rewrote to: "Produce a terse orientation report for the current project", made brain-QA step conditional ("If your project ships brain-QA muscles ... otherwise skip and note absence"), made Memory sibling reference conditional ("If the project configures a shared memory bus ..."). Preserves the shape (identity + git state + continuity + brain health + announcements + output) as an audience-adapted status pattern.
- `ai-memory-setup/SKILL.md` retains all `Alex_ACT_Memory` sibling-repo references as-is — they're by design (the skill IS about Alex_ACT_Memory). Heirs who don't use Memory ignore this skill safely.

**Composition with earlier batches**:

- `agent-delegation` (this batch) + `plan` (Batch 2): plan-mode discipline names when to invoke a subagent; agent-delegation names how.
- `code-review` instruction + skill (this batch) + `security-and-hardening` (Batch 6): OWASP-scoped review composes into general code review.
- `code-review` + `adversarial-review` (Batch 1): structured skepticism at review time.
- `risk-analysis` (this batch) + `problem-framing-audit` (Batches 1+2): frame first, then assess risk.
- `status-reporting` (this batch) + `communication-craft` (Batch 4): status reports use audience lead + stakeholder-adapted framing.
- `/banner` (this batch) invokes `svg-banner` skill (Batch 9) — resolves the composition surface between prompt and skill.
- `/status` (this batch) reads `HANDOFF.md` per `proactive-awareness` (Batch 4) + `memory-triggers` (Batch 3) cross-session-continuity patterns.

### Added — Batch 9: Craft skills cluster (2026-07-30)

Thirteen artifacts covering authoring craft (big-idea, humanizer, doc-hygiene, markdown-mermaid, markdown-sanitization-chain, lint-clean-markdown, svg-banner) and engineering craft (mutation-testing, systematic-debugging, test-driven-development, token-waste-elimination). Largest batch to date and closes the pending `svg-banner` cross-ref from Batch 7 (browser-tools).

**Instructions (2)**:

- **`doc-hygiene.instructions.md`** — Routing pointer to doc-hygiene skill; fires on `**/*doc*audit*,**/*doc*quality*,**/*drift*,**/*hygiene*` patterns.
- **`markdown-mermaid.instructions.md`** — Routing pointer to markdown-mermaid skill; fires on `**/*.md,**/*mermaid*` patterns.

**Skills (11)**:

- **`big-idea/SKILL.md`** — Distill the central claim before summary-shaped output (hero copy, commit subjects, PR titles, ADR titles, executive summaries). 6-step distill (context read → claim → arc → audience → stance → emit) tested against Saint-Exupéry's removal rule (delete sentences until the next deletion breaks the claim).
- **`humanizer/SKILL.md`** — Remove 29 documented AI-writing patterns (Wikipedia's "Signs of AI writing") via draft → self-audit → rewrite. Optional voice-calibration from user-provided writing sample. Adapted from Hermes Agent / blader/humanizer.
- **`doc-hygiene/SKILL.md`** — Anti-drift rules for living documents: count elimination (hardcoded counts become stale within days), single source of truth per metric, link-integrity checker (find broken markdown links across the tree), orphan detection, docs-as-architecture principle.
- **`markdown-mermaid/SKILL.md`** — Author Mermaid diagrams that render correctly on first attempt. Config-driven init directive + linkStyle + semantic classDef vocabulary from `.github/config/brand-palette.json` (6-role palette: blue/green/purple/gold/red/neutral + typography). Bundled references: `references/pitfalls.md` (renderer footguns), `references/tool-ecosystem.md` (Mermaid vs Excalidraw vs D2 vs PlantUML), `references/diagram-reference.md`, `references/markdown-best-practices.md`, `markdown-light.css` (preview styling).
- **`markdown-sanitization-chain/SKILL.md`** — Render user-supplied markdown safely via `marked.js → DOMPurify → Mermaid` pipeline. Order matters — skipping the sanitizer is XSS. DOMPurify allowlist for Mermaid-specific attributes.
- **`mutation-testing/SKILL.md`** — Meta-test the test harness: apply small intentional defects to production code and expect the suite to catch each one. Surfaces silent coverage gaps that 100% line-coverage hides.
- **`systematic-debugging/SKILL.md`** — 4-phase root-cause-first method (investigate → pattern-analyze → hypothesize → implement) that beats guess-and-check thrashing. Use for any bug, test failure, unexpected behavior before proposing fixes.
- **`test-driven-development/SKILL.md`** — Enforce RED-GREEN-REFACTOR for any feature, bug fix, refactor, or behavior change. Write failing test first, watch it fail, write minimal code to pass, refactor. Carve out only throwaway prototypes and generated code.
- **`token-waste-elimination/SKILL.md`** — Audit active brain artifacts for context cost, duplicated guidance, oversized routing files, stale metadata. Use during brain audits, quarterly review, or when instructions feel heavy.
- **`lint-clean-markdown/SKILL.md`** — Write markdown that passes markdownlint on first attempt. Encodes the most common rules (MD012 blank-line, MD022 heading-spacing, MD040 fenced-code language, MD024 unique-heading, MD029 ordered-list) as muscle memory.
- **`svg-banner/SKILL.md`** — Generate 1200×320 SVG banners for READMEs, plans, notes, release artifacts. Bundled `scripts/generate-banner.cjs` muscle + `assets/mark-mono-emerald-256.png` mark. Pluggable brand via `.github/config/banner-brand.json` (structure) + `.github/config/brand-palette.json` (colors/typography). Default is the Alex ACT brand (slate-900 background, emerald-teal-cyan accent, x-loop mark, ACT/EDITION/DOCS/RELEASE/PLAN/NOTE watermarks). Heirs override the config for their own brand. **Closes the pending cross-ref from Batch 7 (`browser-tools` referenced svg-banner).**

**Bundled resources**:

- `.github/config/brand-palette.json` — Shared 6-role semantic palette + typography, referenced by markdown-mermaid, svg-banner, and (in the sibling ecosystem) the illustrator plugin's flint-chart + print-svg-style-guide skills.
- `.github/config/banner-brand.json` — Banner-specific structure config (labels, mark, watermarks, colors); shipped with default Alex ACT brand values, heirs override.
- `.github/skills/svg-banner/assets/mark-mono-emerald-256.png` — Default Alex ACT x-loop mark, 256×256 mono emerald.
- `.github/skills/svg-banner/scripts/generate-banner.cjs` — Banner generator; reads both config files with shallow-merged fallback to built-in Alex ACT default so behavior is byte-equivalent when no config override is present.
- `.github/skills/markdown-mermaid/references/{diagram-reference,markdown-best-practices,pitfalls,tool-ecosystem}.md` + `markdown-light.css` — Reference bundle and preview CSS.

**Adaptation applied**:

- 11 of 13 files ported verbatim. Two required light adaptation to remove Steward-specific references while preserving the discipline:
  - `big-idea/SKILL.md`: (a) rewrote "American English, per Cardinal Rule 4 in `copilot-instructions.md`" to "American English by default (if your project defines a language rule in `copilot-instructions.md`, follow it — Alex ACT itself uses American English per Cardinal Rule 4)" — preserves the recommendation while acknowledging heirs may have their own language rule; (b) same soften in the anti-patterns table row for British spelling; (c) rewrote the `## Falsifiability` tracking line from "Track in `operations/ledgers/curation-log.md`" to "Track in your project's audit trail (Alex ACT itself tracks in `operations/ledgers/curation-log.md`)" — heirs adapt to their own ledger location.
  - `token-waste-elimination/SKILL.md`: reframed the two `node scripts/brain-qa.cjs` invocation blocks as "if your project ships brain-QA muscles like Alex ACT's ..." so heirs without those muscles have a fallback path (measure by hand). The scripts still ship in Alex_ACT_Steward and heirs installing Core through the plugin transport won't have them locally by default.
- Zero content edits to the other 11 files. `mutation-testing/SKILL.md` retains its origin story naming Alex_ACT_Extension + Alex_ACT_Edition commits as historical evidence of pattern effectiveness — the story is illustrative, not an example a heir needs to reproduce.

**Composition with earlier batches**:

- `big-idea` (this batch) + `communication-craft` (Batch 4): communication-craft frames the whole message; big-idea frames only the headline. Composable.
- `humanizer` (this batch) + `big-idea` (this batch): big-idea authoring routes through humanizer's AI-tell check before emit.
- `doc-hygiene` (this batch) + `no-deferred-debt` (Batch 4): both fire on stale content — no-deferred-debt for tech-debt scope, doc-hygiene for documentation-drift scope.
- `markdown-mermaid` (this batch) + `svg-banner` (this batch): shared `brand-palette.json` config keeps mermaid diagrams and SVG banners visually consistent.
- `markdown-sanitization-chain` (this batch) + `security-and-hardening` (Batch 6): both surface XSS — security-and-hardening at the code boundary, markdown-sanitization-chain at the render pipeline.
- `mutation-testing` + `test-driven-development` + `systematic-debugging` (all this batch): three engineering-quality disciplines compose — TDD writes the test, systematic-debugging fires when the test surfaces a defect, mutation-testing meta-tests whether the test suite is trustworthy.
- `token-waste-elimination` (this batch) + `doc-hygiene` (this batch): both audit active content for waste; token-waste-elimination is context-cost-scoped, doc-hygiene is documentation-drift-scoped.
- `svg-banner` (this batch): resolves the pending cross-ref from `browser-tools/SKILL.md` (Batch 7). Batch 7's dangling reference now resolves locally in Core.

### Added — Batch 8: Git + lint + MCP cluster (2026-07-30)

Five artifacts covering the highest-frequency developer disciplines heirs need after platform safety: version control, lint ownership, and Model Context Protocol server construction.

**Instructions (3)**:

- **`git-workflow.instructions.md`** (`applyTo: **/.*git*,**/.github/**`) — Branch hygiene, safe-commit patterns (severity-tagged per `[typo|clarification|behaviour|constitutional]` convention), recovery from lost commits + bad merges + accidental pushes.
- **`lint-discipline.instructions.md`** (`applyTo: **`) — If you touched a file, you own its lint state on exit. Pre-existing findings become yours the moment you open the file — no "not my edit" excuses. Use VS Code 1.122+ **"Search only in changed files"** toggle to enumerate the scope. Codified 2026-04-30 from a real defect where 10 MD060 findings were shipped as "pre-existing."
- **`mcp-development.instructions.md`** (`applyTo: **/*mcp*,**/*mcp-server*,...`) — Routing pointer that fires on MCP file patterns and delegates to the `mcp-builder` skill for detailed authoring guidance.

**Skills (2)**:

- **`git-workflow/SKILL.md`** — Detailed procedures backing the git-workflow instruction. Worked examples for branch creation, staging discipline, commit message shape, recovery from `git reset --hard` mistakes, `git reflog` triage, force-push protection.
- **`mcp-builder/SKILL.md`** — Complete authoring guide for MCP servers in Python (FastMCP), Node/TypeScript (MCP SDK), and C#/.NET (Microsoft MCP SDK). Includes: (1) **Build vs Use Existing** decision matrix listing Microsoft's built-in MCPs (Azure MCP with 48+ services, Foundry MCP, Fabric MCP, Playwright MCP, GitHub MCP); (2) implementation patterns per language; (3) authentication with `DefaultAzureCredential` for Azure-targeted servers; (4) testing checklist; (5) common-issues table (connection failures, auth expiry, tool discovery, timeouts, schema validation).

**Adaptation applied**:

- `git-workflow.instructions.md`, `lint-discipline.instructions.md`, `mcp-development.instructions.md`, `git-workflow/SKILL.md` — ported verbatim. Zero content edits.
- `mcp-builder/SKILL.md` — dropped the `## Supervisor Curation Use` section (lines 11-38: three Steward-only duties around Mall MCP curation, evaluating heir MCP requests, and triaging heir MCP escalations; heirs don't curate the Mall or triage other heirs' work). Rewrote the opening paragraph from "Build, curate, and triage MCP servers for ACT heirs and the Plugin Mall. Three Supervisor duties below..." to a heir-appropriate framing. Dropped the `mall-curation` cross-reference from Related Skills. Everything else preserved verbatim.

**Composition with earlier batches**:

- `git-workflow` (this batch) + `no-deferred-debt` (Batch 4): if a git operation surfaces stale references, fix in the same turn.
- `lint-discipline` (this batch) + `no-deferred-debt` (Batch 4): pre-existing lint findings on a touched file are debt — both rules converge on "fix now."
- `mcp-builder` (this batch) + `security-and-hardening` (Batch 6): MCP servers accept untrusted tool arguments — hardening principles apply.
- `mcp-development` (this batch) + `tool-awareness` (Batch 7): both address the tool ecosystem from different angles — tool-awareness for consumption, mcp-development for production.

### Added — Batch 7: Tooling awareness cluster (2026-07-30)

Four artifacts covering the platform-safety discipline heirs need before their first terminal command, deferred-tool call, or browser interaction.

**Instructions (3)**:

- **`terminal-command-safety.instructions.md`** (`applyTo: **`) — Backtick Hazard prevention (always temp-file for backticks / multi-line / heredoc; place temp file OUTSIDE working tree to prevent commit leak; git commit-message pattern with `$env:TEMP` + `-F $m`). Output capture failures (redirect-then-read pattern). Terminal hanging (`mode=async` for >15s commands, non-interactive flags, network timeouts, no heredoc blocks). VS Code 1.117-1.128 platform-change table.
- **`tool-awareness.instructions.md`** (`applyTo: **`) — Deferred tools (VS Code 1.118+) require `tool_search` before use. External ingest (VS Code 1.119+) provides context in remote workspaces. VS Code 1.122-1.128 conveniences table. Skill picker surfacing (VS Code 1.118+): SKILL.md descriptions appear in the slash picker alongside prompts; **never strip descriptions to declutter the picker** — three-consumer discipline (agent discovery + brain QA + picker tooltip).
- **`tool-awareness-categories.instructions.md`** (`applyTo: **/*tool*,**/*mcp*,**/*github*,...`) — Scoped companion reference. Common deferred-tool categories (GitHub, Azure, Fabric, Microsoft docs, browser, notebook, mermaid, bicep, figma, Microsoft Graph) with search-query patterns. Loads only when working with tools / MCP / GitHub — not always-on.

**Skills (1)**:

- **`browser-tools/SKILL.md`** — VS Code 1.127+ browser tools (`open_browser_page`, `screenshot_page`, `click_element`, `navigate_page`, `run_playwright_code`). Five patterns: (1) bot-protected sites (`fetch_webpage` returns challenge → browser tools clear it naturally); (2) password-hand-off protocol (**never** `type_in_page` on password / MFA / OTP fields — route to user, they type into visible browser); (3) file:// local rendering (HTML with `fetch()` of sibling .md/.json/.svg works under Playwright's file-access flags; no HTTP server needed); (4) SVG/PNG/JPG/WebP/GIF/AVIF/PDF viewing via file://; (5) design/UI validation via screenshot-driven review. Empirically verified 2026-07-26 against Alex_ACT_Steward's docs shell + branding SVGs (evidence preserved as illustration; heirs adapt paths to their workspace).

**Adaptation applied**:

- All 4 files ported from Steward. Minimal adaptation: one line in `tool-awareness.instructions.md` changed "Supervisor ships one" → "Alex_ACT_Steward ships one" (accurate historical reference for current-state Steward, still names a concrete example).
- `browser-tools/SKILL.md` retains the 2026-07-26 empirically-verified paths from Alex_ACT_Steward's workspace as illustration — the framing already labels them as verification evidence + template. Heirs adapt paths to their own workspace.
- Intra-Core cross-refs resolve locally: `browser-tools/SKILL.md` references `tool-awareness.instructions.md` (this batch) + `system-prompt-skepticism.instructions.md` (Batch 1) + `terminal-command-safety.instructions.md` (this batch); `browser-tools` also references [`svg-banner`](../svg-banner/SKILL.md) (**pending future batch — will not resolve yet**).

**Composition with earlier batches**:

- `tool-awareness` (this batch) + `tool-awareness-categories` (this batch) form a scoped pair: always-on rule + on-demand lookup table.
- `terminal-command-safety` (this batch) + `security-and-hardening` (Batch 6): OWASP boundary in code, safety boundary in the shell that generates code. Complementary layers.
- `browser-tools` (this batch) + `pii-memory-filter` (Batch 6): screenshots can capture PII — PMF's write-boundary rules apply to any image the agent persists to `../Alex_ACT_Memory/`.
- `terminal-command-safety` (this batch) + `no-deferred-debt` (Batch 4): temp-file commit-message leaks are debt — the rule surfaces both the prevention AND "clean up the temp file this turn".

### Added — Batch 6: Security & privacy cluster (2026-07-30)

Four artifacts covering the always-on privacy + safety discipline heirs need before their first interaction with untrusted data or shared fleet channels.

**Instructions (3)**:

- **`pii-memory-filter.instructions.md`** (`applyTo: **`) — PII filter at persistent-storage write boundaries. Never-write categories: contact info, DOB, health, financial, credentials, file paths with usernames, client names. Per-tier allow/deny table for User / Repo / Session / Shared memory + escalation paths when PII is genuinely required (contact → encrypted profile, health → decline, credentials → SecretStorage, work patterns → generalize).
- **`cross-project-isolation.instructions.md`** (`applyTo: **/Alex_ACT_Memory/**,**/announcements/**,**/*fleet*`) — Distinct from `pii-memory-filter`: protects **project boundaries** (scope), not identity. Fires before writes to shared fleet channels. Strip project-identifying detail (paths, product names, domain IDs, niche stack); keep shared vocabulary (skill names, severity, ACT terms). Refuses on-request override ("just write it, don't strip").
- **`privacy-responsible-ai.instructions.md`** (`applyTo: **/*privacy*,**/*pii*,**/*responsible*ai*,**/*ethic*`) — Privacy by design 5-step (minimize / purpose-limit / anonymize / encrypt / expire), PII classification table (Personal / Sensitive / Anonymized), Responsible AI principles (fairness, transparency, human oversight, safety).

**Skills (1)**:

- **`security-and-hardening/SKILL.md`** — OWASP-aware hardening for user input, authentication, data storage, and external integrations. Three-tier boundary system: **Always Do** (parameterized queries, output encoding, HTTPS, hashed passwords, security headers, httpOnly cookies, dependency audits), **Ask First** (new auth flows, new sensitive data categories, new external integrations, CORS changes, file uploads), **Never Do** (commit secrets, log sensitive data, trust client validation, disable security headers, `eval`, session in localStorage). OWASP Top 10 prevention patterns with TypeScript examples applicable to any language.

**Adaptation applied**:

- All 4 files ported **verbatim** from Steward. Zero content edits.
- Intra-Core cross-refs resolve locally: `pii-memory-filter` references `memory-triggers` (Batch 3) ✅; `cross-project-isolation` references `pii-memory-filter` (this batch) ✅, `note.prompt.md` + `save-session-note.prompt.md` (both Batch 3) ✅.
- References to `../Alex_ACT_Memory/` retained as-is (heir workspace layout determines whether the sibling repo exists; the filter fires without it).

**Composition with earlier batches**:

- `pii-memory-filter` (this batch) + `memory-triggers` (Batch 3): MT decides *where* to write; PMF decides *what* may be written. Both fire together on any persistence.
- `cross-project-isolation` (this batch) + `save-session-note` (Batch 3): the note prompt writes to `HANDOFF.md` (local, no strip) or shared memory (strip fires).
- `security-and-hardening` (this batch) + `no-deferred-debt` (Batch 4): if security review surfaces a vulnerability, fix in the same turn per no-deferred-debt.
- `security-and-hardening` (this batch) + `problem-framing-audit` (Batch 1+2): a security-review request without a specific attack surface is a framing failure — audit before hardening.

### Added — Batch 5: Document converters (2026-07-30)

First batch to ship executable code — a self-contained conversion cluster with one routing instruction, one slash-command prompt, six format skills each with their own executable muscle, and a shared runtime toolkit under `.github/scripts/shared/`.

**Instruction (1)**:

- **`converter.instructions.md`** — Document conversion routing. Detects source and target format from the user's request, delegates to the matching format skill + muscle. Applies on `**/*convert*,**/*docx*,**/*word*,**/*eml*,**/*html-to-md*,**/*md-to-*`.

**Prompt (1)**:

- **`convert.prompt.md`** (`/convert`) — User-invokable trigger. Steps: detect formats → load format skill → run muscle → validate output → report.

**Skills (6)** with bundled executable muscles under `<skill>/scripts/`:

- **`docx-to-md/`** — Word (.docx) → clean Markdown with image extraction and pandoc cleanup.
- **`html-to-md/`** — HTML → clean Markdown via pandoc.
- **`md-to-eml/`** — Markdown → RFC 5322 email (.eml) with inline CSS and CID images.
- **`md-to-html/`** — Markdown → standalone HTML with embedded CSS, images, and Mermaid diagrams.
- **`md-to-txt/`** — Markdown → clean plain text via pandoc.
- **`md-to-word/`** — Markdown (with Mermaid + SVG) → Word (.docx). Uses jszip when available, falls back to pandoc.

**Shared runtime (4 modules under `.github/scripts/shared/`)** — bundled with the plugin, not declared as separate assets in `assets[]` because they're used by the converter skills, not independently invokable:

- **`tool-runner.cjs`** — Shell-invocation helper with structured error handling.
- **`markdown-preprocessor.cjs`** — Frontmatter parsing, Mermaid extraction, SVG resolution.
- **`mermaid-pipeline.cjs`** — Mermaid diagram rendering via mermaid-cli.
- **`data-uri.cjs`** — Base64 encoding for embedded images.

**Adaptation applied**:

- All 8 markdown files + 6 skill scripts + 4 shared runtime modules ported **byte-identically** from Steward (which itself byte-identically ported them from Edition v4.2.0). Zero content edits.
- `SKILL.md` cross-references to `../../../operations/ledgers/curation-log.md` and other Steward paths retained as-is (heirs' own repo layout dictates whether these resolve; the muscles run without them).
- The `converter.instructions.md` routing table points at `node .github/skills/<format>/scripts/<format>.cjs` paths — these resolve locally in Core because the scripts ship at those exact paths.

**Runtime prerequisites** (heirs must install separately):

- **pandoc** on PATH (required for all 6 converters) — `winget install --id JohnMacFarlane.Pandoc -e` or [pandoc.org](https://pandoc.org/installing.html).
- **mermaid-cli** on PATH (required for md-to-html + md-to-word when Mermaid diagrams present) — `npm install -g @mermaid-js/mermaid-cli`.
- **jszip** (optional; only used by md-to-word for faster .docx generation) — `npm install jszip` inside a Node project or globally.

**Composition with earlier batches**:

- `converter.instructions.md` fires on document conversion requests → routes to format skill → `convert.prompt.md` (Batch 5) provides the user-facing slash command.
- `no-deferred-debt.instructions.md` (Batch 4) composes: if a converter surfaces stale references in the middle of a conversion, fix in the same turn.
- `problem-framing-audit.instructions.md` (Batch 1 + skill Batch 2) fires when the user says "convert this" without a target format — frame audit surfaces the ambiguity before the converter runs.

### Added — Batch 4: Craft + cognitive-discipline (2026-07-30)

Seven always-on instructions completing the cognitive foundation that runs alongside the ACT canon. Same-shape port as Batch 1 (instructions only, no cross-artifact coupling).

**Instructions (7)**:

- **`communication-craft.instructions.md`** — SBI feedback model, stakes calibration, code-review voice, So-What/What/Now-What audience lead, Need/Solution/Feature elicitation ladder.
- **`emotional-intelligence.instructions.md`** — 6-signal detection (frustration / confusion / success / flow / excitement / disengagement) with per-signal adaptation. Mimicry prevention (don't adopt user distress vocabulary).
- **`knowledge-coverage.instructions.md`** — High / Medium / Low / Unknown taxonomy with per-level language calibration. Optional visible-confidence badge gated on heir workspace's `.github/config/cognitive-config.json`.
- **`no-deferred-debt.instructions.md`** — If a turn surfaces tech debt (stale references, dead links, outdated content), fix it in the same turn. Deferral requires a named decision-blocker, not vague 'follow-up'. Composes with `lint-discipline` (pending future batch).
- **`proactive-awareness.instructions.md`** — PA1 cross-session context recovery (check `HANDOFF.md` at session start), PA2 uncommitted-work detection (count-only nudges >24h old), PA4 focus routing (`goals.json`), silence-as-signal inhibitor (never interrupt flow).
- **`reliance-nudges.instructions.md`** — 6 over-reliance signal patterns (prompt roulette, zero verification, instant high-stakes acceptance, verbatim acceptance, confidence cascade, repeated same error) with per-pattern one-sentence nudge and 5 inhibition rules.
- **`session-health-monitoring.instructions.md`** — Monitor context window via proxy heuristics (~4 chars/token) + BYOK token counter (VS Code 1.120+). Graceful handoff to `HANDOFF.md` when approaching session limits.

**Adaptation applied** (same moderate rules as Batches 1–3):

- Frontmatter, body content, `## Would Revise If` sections preserved verbatim
- Intra-Core cross-references resolve locally (`memory-triggers` ↔ `proactive-awareness`)
- References to heir-workspace config files (`.github/config/cognitive-config.json`, `.github/config/goals.json`, `.github/quality/dream-report.json`) preserved as-is — heirs can adopt or ignore these optional signals
- Reference to `lint-discipline.instructions.md` in `no-deferred-debt` preserved as-is (will resolve when a later batch ships lint-discipline)
- Reference to `tool-awareness.instructions.md` in `session-health-monitoring` preserved as-is (will resolve when a later batch ships tool-awareness)
- References to Mall skills in `reliance-nudges` `## What This Replaces` section preserved as-is (educational Mall skills exist independently of Core)
- Steward-specific origin note in `no-deferred-debt` (`Alyva_Master heir-side discipline (FOUR-REPOS-COMPARISON.md Tier A §0.1 row 3)`) dropped from the Origin section; the discipline itself is preserved
- `lastReviewed` dates preserved from source

**Composition with Batches 1–3**: `memory-triggers` (Batch 3) and `proactive-awareness` (Batch 4) both reference `HANDOFF.md` as the canonical cross-session continuity surface. `epistemic-calibration` (Batch 1) and `knowledge-coverage` (Batch 4) both address confidence expression — different angles: calibration is the always-on floor; coverage is the per-topic assessment. `reliance-nudges` composes with `critical-thinking` (Batch 1 + skill Batch 2) by nudging the user when they skip verification the critical-thinking discipline would have caught.

**Cumulative content in this Unreleased range**: 17 instructions + 7 skills + 5 prompts = 29 total items (0 agents). Version bump to 0.2.0 will happen when the first release is cut.

### Added — Batch 3: Meditation loop (2026-07-30)

Two instructions + one skill + three prompts — the meditation cluster that lets heirs consolidate session learning into permanent architecture. First cross-artifact bundle (instruction ↔ skill ↔ prompt loop) ships in this batch, proving the pattern at small scale.

**Instructions (2)**:

- **`meditation.instructions.md`** — 6-step ritual protocol (review + extract + write + chronicle + handoff + post-mortem). Fires on session end, hard-problem resolution, or explicit user request ("let's meditate", `/meditate`). Includes memory tier routing table.
- **`memory-triggers.instructions.md`** — Always-on triggers for proactive memory formation. Fires on user correction, 3× pattern recurrence, preference declaration, session-end continuity risk. Includes tier selection table + cross-session continuity rules (`HANDOFF.md` at repo root, NOT `/memories/session/`).

**Skills (1)**:

- **`meditation/SKILL.md`** — Detailed body for the always-on `meditation.instructions.md`. 5-step protocol with routing table (which artifact type to write, per pattern). Companion to the meditation instruction; invoked by the `/meditate` prompt.

**Prompts (3)**:

- **`meditate.prompt.md`** (`/meditate`) — User-invokable trigger for the meditation protocol. Loads the meditation skill, runs review + extract + write + chronicle + handoff + `/compact`.
- **`save-session-note.prompt.md`** (`/save-session-note`) — Capture a short pending-action note in repo-root `HANDOFF.md`. Optional mirror to shared memory (`../Alex_ACT_Memory/notes.md` per the Alex ACT constellation, or heir-configured equivalent) with project-specifics stripping.
- **`note.prompt.md`** (`/note`) — Short alias for `/save-session-note`. Skip the "what should I capture?" question if user's request already includes the note text.

**Adaptation applied** (same moderate rules as Batches 1 + 2):

- Frontmatter, body content, `## Would Revise If` sections preserved verbatim where heir-generic
- Intra-Core cross-references (instruction ↔ skill ↔ prompt within the meditation cluster) resolve locally
- `.act-heir.json` reference in `save-session-note.prompt.md` dropped — it's v1 heir-template infrastructure (`Alex_ACT_Edition` marker) that plugin-native heirs don't have. Replaced with generic "project identifier if available".
- `Legacy migration` section in `save-session-note.prompt.md` dropped — it described a 2026-05-18 `SESSION-HANDOFF.md` → `HANDOFF.md` rename that only applies to Steward-era heirs; plugin-native heirs have no legacy state.
- `Brain Retraining (longer cycles)` section in `meditation/SKILL.md` heavily trimmed — the original described Steward's weekly `brain-qa` queue, monthly `/audit-coherence`, quarterly retraining ADR cadence (all Steward-curator work). Replaced with a short heir-appropriate "per release / per quarter (optional)" cadence note.
- References to `../skills/append-and-review/SKILL.md` (Steward-only) dropped
- References to `../instructions/brain-curation-rules.instructions.md` (Steward-only) dropped
- References to `docs/templates/quarterly-retraining-ADR.md` (Steward-only template) dropped
- Cardinal Rule 3 audit-criteria section dropped (Cardinal Rule 3 is Steward's rule, not heir's)
- Reference to `../../Alex_ACT_Memory` sibling repo preserved as-is (per the Alex ACT constellation shape)
- `lastReviewed` dates preserved from source

**Cross-artifact loop verified**: the meditation cluster forms a self-contained loop where `meditation.instructions.md` (always-on) triggers `meditation/SKILL.md` (detailed body) which is invoked by `/meditate` (slash command). `memory-triggers.instructions.md` (always-on) triggers automatic writes to `HANDOFF.md` via `/save-session-note` or its short alias `/note`. All refs within the cluster resolve locally within Core.

**Cumulative content in this Unreleased range**: 10 instructions + 7 skills + 5 prompts = 22 total items (0 agents). Version bump to 0.2.0 will happen when the first release is cut.

### Added — Batch 2: Reasoning + planning muscles (2026-07-30)

Six skills + two paired slash-command prompts. Batch 2 completes the reasoning loop that Batch 1's ACT canon instructions gestured at: the instructions declared *when* to think critically; the Batch 2 skills declare *how*.

**Skills (6)**:

- **`anti-hallucination/SKILL.md`** — First leg of the epistemic triad. Prevents fabrication at generation point via input-discipline + output-discipline signals. Composes with `epistemic-calibration` (always-on) + `critical-thinking` (skill).
- **`critical-thinking/SKILL.md`** — Second leg of the epistemic triad. Detailed body for the always-on `critical-thinking.instructions.md` from Batch 1. Ships Discipline -1 (frame audit), Discipline 0 (materiality gate), 7 disciplines (alternatives / missing-data / evidence-quality / self-report-skepticism / bias-detection / falsifiability / devil's-advocate), never-guess floor, domain adaptation guidance.
- **`deep-review/SKILL.md`** — Three-perspective adversarial review (Advocate / Skeptic / Architect). Same-model role separation for high-stakes reviews. Composes with cross-model external critic from `adversarial-review.instructions.md` Batch 1 when stakes justify the switching cost.
- **`plan/SKILL.md`** — Plan-mode discipline. Writes concrete actionable markdown plans with bite-sized tasks (2-5 min each), exact file paths, complete code, verification steps. No execution during the plan turn — output is the plan file itself.
- **`problem-framing-audit/SKILL.md`** — Detailed body for Discipline -1 frame audit. 8-check step-back protocol (restate / generalise / specialise / invert / five-whys / pre-mortem / stakeholder / frame-audit). Companion to `problem-framing-audit.instructions.md` from Batch 1.
- **`spike/SKILL.md`** — Throwaway feasibility experiments. Decompose into 2-5 independent questions, research per spike, build minimal observable prototype, return VALIDATED/PARTIAL/INVALIDATED verdicts. Disposable by design.

**Prompts (2)** — deferred from Batch 1; now the skill bodies exist to invoke:

- **`critical-thinking.prompt.md`** (`/critical-thinking`) — User-invokable trigger for the full critical-thinking pass. Invokes the `critical-thinking` skill; produces visible markers.
- **`problem-framing-audit.prompt.md`** (`/problem-framing-audit`) — User-invokable trigger for the step-back protocol. Invokes the `problem-framing-audit` skill; produces frame/cause-frame/considered-framings markers when reframes surface.

**Adaptation applied** (same moderate rules as Batch 1):

- Frontmatter, body content, `## Would Revise If` sections preserved verbatim from Steward source
- Intra-Core cross-references (skill ↔ skill, skill ↔ instruction, prompt ↔ skill, prompt ↔ instruction) resolve locally within the plugin
- Framework canon references externalized to GitHub URLs pointing at `fabioc-aloha/Alex_ACT_Steward`
- References to instructions not yet in Core (`agent-delegation`, `reliance-nudges`) preserved as-is; will resolve when a future batch ships them
- References to skills not yet in Core (`test-driven-development` from `plan`) preserved as-is; noted in prose as pending
- `local/` heir-customization pattern preserved (critical-thinking skill's domain-extension section still tells heirs to create `.github/skills/local/<domain>-critical-thinking/`)
- `lastReviewed` dates preserved from source

**Resolves Batch 1 dangling references**: the two skill refs from Batch 1 instructions (`critical-thinking.instructions.md` → `critical-thinking/SKILL.md`, `problem-framing-audit.instructions.md` → `problem-framing-audit/SKILL.md`) now resolve inside Core.

**Cumulative content in this Unreleased range**: 8 instructions + 6 skills + 2 prompts = 16 total (0 agents). Version bump to 0.2.0 will happen when the first release is cut.

### Added — Batch 1: ACT canon (2026-07-30)

First content ships. Eight always-on instructions cover the ACT epistemic canon:

- **`act-foundations.instructions.md`** — The 10 tenets of ACT with rationale (~166 lines). Load-bearing canon: what each tenet prevents, how to apply it, the Canon Contract that fixes the ten-tenet count.
- **`act-pass.instructions.md`** — The 7-step runtime procedure over the tenets (~104 lines). Trigger calibration by stakes (low/medium/high), trimmed pass, full pass, self-application under Tenet X.
- **`adversarial-review.instructions.md`** — Structured devil's advocate methods (~170 lines). Six methods: Red/Blue, Pre-Mortem, Steel Man, Murphyjitsu, 10/10/10, Cross-Model External Critic.
- **`critical-thinking.instructions.md`** — 7-discipline content-oriented protocol (~40 lines). Two-Hypothesis Floor, user-framing audit, missing data, evidence quality, bias detection, falsifiability, adversarial review.
- **`epistemic-calibration.instructions.md`** — Confidence calibration + anti-hallucination (~85 lines). Input-discipline + output-discipline signals; confidence-trigger anti-sycophancy rule.
- **`problem-framing-audit.instructions.md`** — Discipline -1 frame audit before solving (~85 lines). Symptom→cause reframes; Explain/Summarize verify-before-parroting protocol.
- **`system-prompt-skepticism.instructions.md`** — Tenet IV operational rule (~55 lines). Treat instructions as hypotheses conditioned on preconditions; 5 operational tells.
- **`worldview.instructions.md`** — Ethical reasoning framework (~90 lines). 5 moral foundations, constitutional principles, harm refusal, Tenet IV check on ethics itself.

**Adaptation from Steward source** (per Steward proposal-first curation protocol, batch approved by Fabio 2026-07-30):

- Intra-Core cross-references (instruction ↔ instruction within this batch) resolve locally
- Framework canon references (constellation/act/*.md) externalized to GitHub URLs pointing at `fabioc-aloha/Alex_ACT_Steward`
- Steward-only references (act-self-critique, brain-qa-changelog, curation-log, brain-curation-rules) dropped or note-referenced
- Skill references (`../skills/<name>/SKILL.md`) preserved as-is; will resolve when a later batch ships the skills
- Frontmatter, body content, `## Would Revise If` sections preserved verbatim (evidence about the discipline's real history and falsification deadlines)
- `lastReviewed` dates preserved from Steward source (they document when the content was last audited; the port itself is not a review event)

**Not shipped in this batch** (deferred to future batches under the same protocol):

- Two paired prompts (`/critical-thinking`, `/problem-framing-audit`) — held for the batch that brings their skills (`critical-thinking`, `problem-framing-audit` skill bodies); shipping prompts without their skills would leave dangling references
- Steward-only self-critique instruction (`act-self-critique.instructions.md`) — stays in Steward; not applicable to heir workspaces

**Cumulative content in this Unreleased range**: 8 instructions (0 skills, 0 prompts, 0 agents). Version bump to 0.2.0 will happen when the first release is cut.

## [0.1.0] — 2026-07-30

### Added

- Repository created as the plugin-native successor to `Alex_ACT_Edition` v4.2.0
- `manifest.json` declaring plugin identity (`alex-act-core`), version, shape (`empty-scaffold`), MIT license, and empty `assets` arrays for `skills`, `instructions`, `prompts`, `agents`
- `README.md` covering purpose, three-layer plugin stack framing (Baseline / Specialization / Local), install commands, and roadmap
- `LICENSE` (MIT — same as sibling plugins)
- `.gitignore` and `.markdownlint.json` matching the `alex-act-illustrator-plugin` pattern
- `.github/copilot-instructions.md` placeholder identifying the plugin's role
- Empty `.github/{skills,instructions,prompts,agents}/` directories with `.gitkeep` markers for future content
- `.vscode/settings.json` for self-dogfooding the plugin discovery locations

### Context

- Steward Plan gap #1 (Phase 3 blocker) named `Alex_ACT_Core` as the terminal migration goal for the plugin-architecture lineage. This commit partially resolves that gap: the repository now exists as a skeleton, but no content ships yet. Full resolution requires evidence-gated content proposals to land through the Steward brain-curation protocol.
- Sibling `alex-act-illustrator-plugin` (published 2026-07-30 to Mall) proves the CLI-plugin transport end-to-end; Core rides on the same proven shape.

### Not included

- **No skills, instructions, prompts, or agents ship in v0.1.0.** Installing this version registers the plugin but adds no artefacts to a heir's `.github/`.
- **No MCP servers.** Future promotions may add MCP sidecars if a candidate skill needs one; none in the initial scaffold.
- **No GitHub remote yet.** Repository is local-only until the skeleton stabilizes. See Steward's `HANDOFF.md` for the queued remote-creation decision.

## Format guide

- `[Unreleased]` collects work in progress; graduates to a version on release
- Version headers use `[MAJOR.MINOR.PATCH] — YYYY-MM-DD` per SemVer
- Sections: `Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security` / `Context` / `Not included`
