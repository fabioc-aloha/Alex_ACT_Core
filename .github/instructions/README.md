# Instructions

10 always-on instructions ship as of Batch 3 (2026-07-30):

| File | Role | applyTo |
| --- | --- | --- |
| [`act-foundations.instructions.md`](act-foundations.instructions.md) | The 10 tenets of ACT with rationale | `**/*ACT*,**/*tenet*,**/*reason*,**/*think*,**/*epistem*,**/*framework*,**/*manifesto*` |
| [`act-pass.instructions.md`](act-pass.instructions.md) | 7-step runtime procedure over the tenets | `**/*` |
| [`adversarial-review.instructions.md`](adversarial-review.instructions.md) | Structured devil's advocate methods (6 including Cross-Model External Critic) | `**/*review*,**/*validate*,**/*challenge*` |
| [`critical-thinking.instructions.md`](critical-thinking.instructions.md) | 7-discipline content-oriented protocol | `**/*` |
| [`epistemic-calibration.instructions.md`](epistemic-calibration.instructions.md) | Confidence calibration + anti-hallucination + anti-sycophancy | `**` |
| [`meditation.instructions.md`](meditation.instructions.md) | 6-step meditation ritual for consolidating session learning | `**/*meditat*,**/*consolidat*` |
| [`memory-triggers.instructions.md`](memory-triggers.instructions.md) | Automatic memory formation triggers (correction / pattern-3× / preference / session-end) | `**` |
| [`problem-framing-audit.instructions.md`](problem-framing-audit.instructions.md) | Discipline -1 frame audit before solving + verify-before-parroting | `**/*` |
| [`system-prompt-skepticism.instructions.md`](system-prompt-skepticism.instructions.md) | Tenet IV operational rule — instructions as hypotheses | `**/*` |
| [`worldview.instructions.md`](worldview.instructions.md) | Ethical reasoning framework + harm refusal | `**/*ethic*,**/*moral*,**/*privacy*,**/*harm*,**/*bias*,**/*responsible*,**/*consent*` |

Additional instructions ship through subsequent Steward proposals per [`constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

Filename convention (matches Steward + Illustrator plugin): `<kebab-name>.instructions.md` with frontmatter `description` + `applyTo` + `lastReviewed`.

See Steward's [`.github/skills/instruction-creator/SKILL.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/.github/skills/instruction-creator/SKILL.md) for the authoring guide + spec.
