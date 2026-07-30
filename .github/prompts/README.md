# Prompts

2 slash-command prompts ship as of Batch 2 (2026-07-30):

| File | Slash command | Role |
| --- | --- | --- |
| [`critical-thinking.prompt.md`](critical-thinking.prompt.md) | `/critical-thinking` | Forces the full critical-thinking pass on a specific claim; produces visible markers (alternatives / missing-data / evidence-quality / bias / falsifiability / adversarial-review) |
| [`problem-framing-audit.prompt.md`](problem-framing-audit.prompt.md) | `/problem-framing-audit` | Forces the step-back protocol on a non-trivial problem; produces frame / cause-frame / considered-framings markers when reframes surface |

Both prompts invoke their companion skill bodies from `.github/skills/` and their always-on instructions from `.github/instructions/`. All references resolve within Core.

Additional prompts ship through subsequent Steward proposals per [`constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

Filename convention (matches Steward + Illustrator plugin): `<kebab-name>.prompt.md` with frontmatter `description` + `lastReviewed`. The `<kebab-name>` becomes the slash-command (`/kebab-name`) in Copilot Chat.

See Steward's [`.github/skills/prompt-creator/SKILL.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/.github/skills/prompt-creator/SKILL.md) for the authoring guide + spec.
