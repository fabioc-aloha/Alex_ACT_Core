# Instructions

21 always-on instructions ship as of Batch 6 (2026-07-30):

| File | Role | applyTo |
| --- | --- | --- |
| [`act-foundations.instructions.md`](act-foundations.instructions.md) | The 10 tenets of ACT with rationale | `**/*ACT*,**/*tenet*,**/*reason*,**/*think*,**/*epistem*,**/*framework*,**/*manifesto*` |
| [`act-pass.instructions.md`](act-pass.instructions.md) | 7-step runtime procedure over the tenets | `**/*` |
| [`adversarial-review.instructions.md`](adversarial-review.instructions.md) | Structured devil's advocate methods (6 including Cross-Model External Critic) | `**/*review*,**/*validate*,**/*challenge*` |
| [`communication-craft.instructions.md`](communication-craft.instructions.md) | SBI feedback + stakes calibration + audience lead + need elicitation | `**` |
| [`converter.instructions.md`](converter.instructions.md) | Document conversion routing — detect source/target format, delegate to matching skill + muscle | `**/*convert*,**/*docx*,**/*word*,**/*eml*,**/*html-to-md*,**/*md-to-*` |
| [`critical-thinking.instructions.md`](critical-thinking.instructions.md) | 7-discipline content-oriented protocol | `**/*` |
| [`cross-project-isolation.instructions.md`](cross-project-isolation.instructions.md) | Strip project specifics before writing to shared fleet channels; refuses on-request override | `**/Alex_ACT_Memory/**,**/announcements/**,**/*fleet*` |
| [`emotional-intelligence.instructions.md`](emotional-intelligence.instructions.md) | 6-signal detection with per-signal adaptation + mimicry prevention | `**` |
| [`epistemic-calibration.instructions.md`](epistemic-calibration.instructions.md) | Confidence calibration + anti-hallucination + anti-sycophancy | `**` |
| [`knowledge-coverage.instructions.md`](knowledge-coverage.instructions.md) | Coverage taxonomy (High / Medium / Low / Unknown) with language calibration | `**` |
| [`meditation.instructions.md`](meditation.instructions.md) | 6-step meditation ritual for consolidating session learning | `**/*meditat*,**/*consolidat*` |
| [`memory-triggers.instructions.md`](memory-triggers.instructions.md) | Automatic memory formation triggers (correction / pattern-3× / preference / session-end) | `**` |
| [`no-deferred-debt.instructions.md`](no-deferred-debt.instructions.md) | Fix tech debt in the same turn it surfaces; deferral requires named decision-blocker | `**` |
| [`pii-memory-filter.instructions.md`](pii-memory-filter.instructions.md) | PII filter at persistent-storage write boundaries; never-write categories + per-tier allow/deny | `**` |
| [`privacy-responsible-ai.instructions.md`](privacy-responsible-ai.instructions.md) | Privacy by design 5-step + PII classification + Responsible AI principles | `**/*privacy*,**/*pii*,**/*responsible*ai*,**/*ethic*` |
| [`proactive-awareness.instructions.md`](proactive-awareness.instructions.md) | Cross-session context recovery + uncommitted-work detection + focus routing + silence-as-signal | `**` |
| [`problem-framing-audit.instructions.md`](problem-framing-audit.instructions.md) | Discipline -1 frame audit before solving + verify-before-parroting | `**/*` |
| [`reliance-nudges.instructions.md`](reliance-nudges.instructions.md) | Detect 6 over-reliance failure modes; one targeted nudge per turn with 5 inhibition rules | `**` |
| [`session-health-monitoring.instructions.md`](session-health-monitoring.instructions.md) | Context-window monitoring + graceful handoff at session limits | `**` |
| [`system-prompt-skepticism.instructions.md`](system-prompt-skepticism.instructions.md) | Tenet IV operational rule — instructions as hypotheses | `**/*` |
| [`worldview.instructions.md`](worldview.instructions.md) | Ethical reasoning framework + harm refusal | `**/*ethic*,**/*moral*,**/*privacy*,**/*harm*,**/*bias*,**/*responsible*,**/*consent*` |

Additional instructions ship through subsequent Steward proposals per [`constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

Filename convention (matches Steward + Illustrator plugin): `<kebab-name>.instructions.md` with frontmatter `description` + `applyTo` + `lastReviewed`.

See Steward's [`.github/skills/instruction-creator/SKILL.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/.github/skills/instruction-creator/SKILL.md) for the authoring guide + spec.
