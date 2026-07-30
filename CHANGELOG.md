# Changelog

All notable changes to `alex-act-core` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing pending yet. First real skill / instruction / prompt / agent lands here when the first Steward proposal per [`constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md) is approved and shipped.

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
