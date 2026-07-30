# Changelog

All notable changes to `alex-act-core` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
