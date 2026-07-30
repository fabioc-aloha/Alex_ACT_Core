# Changelog

All notable changes to `alex-act-core` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
