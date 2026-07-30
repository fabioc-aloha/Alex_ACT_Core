# Alex ACT Core

The plugin-native successor to [`Alex_ACT_Edition`](https://github.com/fabioc-aloha/Alex_ACT_Edition) v4.2.0. Distributes the always-on epistemic discipline and reusable framework skills that heirs install via the [Alex ACT Plugin Mall](https://github.com/fabioc-aloha/Alex_Skill_Mall).

**Status**: v0.1.0 (unreleased). 72 baseline items ship as of 2026-07-30: 33 always-on instructions, 30 skills, 9 slash-command prompts, plus a shared runtime for the bundled document converters. Content lands through evidence-gated Steward proposals per [`Alex_ACT_Steward/constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

**Maintainer**: [`Alex_ACT_Steward`](https://github.com/fabioc-aloha/Alex_ACT_Steward) (top-of-chain in the plugin-architecture lineage since 2026-07-26 fork-and-freeze).

## What this is

Alex ACT Core is the **baseline plugin** — the minimal always-on brain that every heir needs regardless of domain. It sits at the bottom of a three-layer stack:

| Layer | What it ships | Example |
| --- | --- | --- |
| **Baseline** (this plugin) | Always-on epistemic discipline + reusable framework skills, including document converters and a shared runtime | `act-pass`, `critical-thinking`, `problem-framing-audit`, `meditation`, `md-to-word`, `docx-to-md`, `lint-clean-markdown` |
| **Specialization** (Mall opt-in) | Domain plugins heirs install as needed | `alex-act-illustrator-plugin` (visual authoring), future Azure / Fabric / M365 plugins |
| **Local customization** (`.github/skills/local/` in each heir) | Heir-specific customizations | Whatever the heir invented for their own project |

**What Core is NOT**:

- Not the Copilot CLI itself — Core rides on top of Copilot CLI + Chat
- Not the shared Memory bus — that lives in [`Alex_ACT_Memory`](https://github.com/fabioc-aloha/Alex_ACT_Memory) as a Git-backed sibling repo (per Steward Plan)
- Not the Mall itself — the Mall lives in [`Alex_ACT_Plugin_Mall`](https://github.com/fabioc-aloha/Alex_Skill_Mall) and self-curates per ADR-008
- Not a visual-authoring bundle — chart authoring, SVG banners, print figures, and AI imagery live in [`alex-act-illustrator-plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin), not Core

## Why the plugin?

Under the v1 heir-template model, [`Alex_ACT_Edition`](https://github.com/fabioc-aloha/Alex_ACT_Edition) was a template each heir bootstrapped into its own `.github/`. Upgrading meant N-heir manual bootstraps. Under the plugin-native model, Core lives in one place (this repo → Mall) and every heir picks it up on next session via `copilot plugin update alex-act-core`. Fork-and-freeze on 2026-07-26 established that the plugin-native lineage runs alongside the frozen v1 compatibility line rather than replacing it in place.

Full reasoning in the [Steward Plan](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/steward-plan.md) (twelve chapters: overview → distribution mechanism → topology → migration strategy → nomenclature).

## Layout

```text
Alex_ACT_Core/
├── manifest.json               # Mall-side plugin metadata (identity, assets, install paths)
├── README.md                   # (this file)
├── CHANGELOG.md                # Keep a Changelog format
├── LICENSE                     # MIT
├── .gitignore
├── .markdownlint.json
├── .github/                    # Copilot Chat + CLI discovery surface
│   ├── copilot-instructions.md
│   ├── config/                 # brand-palette.json, welcome-baseline.json
│   ├── scripts/shared/         # runtime helpers used by the converter skills
│   ├── skills/                 # 30 skills (framework + craft + converters)
│   ├── instructions/           # 33 always-on instructions
│   ├── prompts/                # 9 slash-command prompts
│   └── agents/                 # (empty; agents ship through heir workspaces or specialization plugins)
└── .vscode/                    # workspace settings for self-dogfooding
```

Same layout as [`alex-act-illustrator-plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) — the proven Steward-authored CLI plugin pattern.

## Install (once content ships)

```powershell
# From the Mall catalog (once published):
copilot plugin install alex-act-core@alex-mall

# Or directly from GitHub during development:
copilot plugin install fabioc-aloha/Alex_ACT_Core
```

Runtime prerequisites for the bundled converters (heirs install separately, once):

- **pandoc** on PATH — required for all 6 converters
- **mermaid-cli** (`mmdc`) on PATH — required for `md-to-html` and `md-to-word` when the source contains Mermaid diagrams
- **jszip** in the workspace `node_modules` — optional; `md-to-word` uses it for a faster path and falls back to pandoc otherwise

## Roadmap

Growth continues through evidence-gated proposals per [`Alex_ACT_Steward/constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md). The Both-classified inventory (framework baseline shipped to Core) is complete as of Batch 10 (2026-07-30). Future additions come from Steward's brain plan Part II under **Both** classification or as new proposals. See Steward's [brain plan](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/brain/plan.md) Part II for the current candidate pipeline.

## Related

- [`Alex_ACT_Steward`](https://github.com/fabioc-aloha/Alex_ACT_Steward) — top-of-chain, author + curator of every shipped artefact
- [`Alex_ACT_Illustrator_Plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) — first shipped Steward CLI plugin; proves the transport
- [`Alex_ACT_Plugin_Mall`](https://github.com/fabioc-aloha/Alex_Skill_Mall) — CLI-native plugin marketplace v3.0.0 GA (2026-07-28)
- [`Alex_ACT_Memory`](https://github.com/fabioc-aloha/Alex_ACT_Memory) — shared Git-backed memory bus (sibling, not a plugin)
- [`Alex_ACT_Edition`](https://github.com/fabioc-aloha/Alex_ACT_Edition) — frozen v1 heir-template compatibility surface (v4.2.0, 2026-07-28)
- Steward Plan Phase 3: [gap #1](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/steward-plan.md) — this repo's creation is the partial resolution

## License

[MIT](LICENSE) — same as sibling plugins.
