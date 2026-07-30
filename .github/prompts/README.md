# Prompts

10 slash-command prompts ship as of Batch 10 (2026-07-30):

| File | Slash command | Role |
| --- | --- | --- |
| [`banner.prompt.md`](banner.prompt.md) | `/banner` | Generate a 1200×320 SVG banner via the svg-banner skill using `.github/config/{banner-brand,brand-palette}.json`. |
| [`configure-vscode.prompt.md`](configure-vscode.prompt.md) | `/configure-vscode` | Apply VS Code user-scope baseline settings for policy compliance. Heirs adapt their project's baseline. |
| [`configure-vscode-verify.prompt.md`](configure-vscode-verify.prompt.md) | `/configure-vscode-verify` | Read-only audit of user-level VS Code/Copilot settings compliance. |
| [`convert.prompt.md`](convert.prompt.md) | `/convert` | Convert a document between Markdown, HTML, Word, email, and plain text. Detects source + target format, runs the bundled converter, validates and reports output. |
| [`critical-thinking.prompt.md`](critical-thinking.prompt.md) | `/critical-thinking` | Forces the full critical-thinking pass on a specific claim; produces visible markers |
| [`meditate.prompt.md`](meditate.prompt.md) | `/meditate` | Runs the meditation protocol — review + extract + write + chronicle + handoff + `/compact` |
| [`note.prompt.md`](note.prompt.md) | `/note` | Short alias for `/save-session-note` — skip the "what should I capture?" question if the note text is already provided |
| [`problem-framing-audit.prompt.md`](problem-framing-audit.prompt.md) | `/problem-framing-audit` | Forces the step-back protocol on a non-trivial problem; produces frame markers when reframes surface |
| [`save-session-note.prompt.md`](save-session-note.prompt.md) | `/save-session-note` | Capture a short pending-action note in repo-root `HANDOFF.md`; optional mirror to shared memory with stripping |
| [`status.prompt.md`](status.prompt.md) | `/status` | Terse read-only project orientation report: identity, git state, HANDOFF.md continuity, optional brain-QA health, announcements. |

All prompts invoke their companion skill bodies from `.github/skills/` and their always-on instructions from `.github/instructions/`. Intra-Core references resolve locally.

Additional prompts ship through subsequent Steward proposals per [`constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

Filename convention (matches Steward + Illustrator plugin): `<kebab-name>.prompt.md` with frontmatter `description` + `lastReviewed`. The `<kebab-name>` becomes the slash-command (`/kebab-name`) in Copilot Chat.

See Steward's [`.github/skills/prompt-creator/SKILL.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/.github/skills/prompt-creator/SKILL.md) for the authoring guide + spec.
