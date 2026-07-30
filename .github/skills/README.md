# Skills

6 skills ship as of Batch 2 (2026-07-30) — reasoning + planning + verification muscles that complete the ACT canon loop:

| File | Role |
| --- | --- |
| [`anti-hallucination/SKILL.md`](anti-hallucination/SKILL.md) | Prevent fabrication at generation point (input-discipline + output-discipline signals). First leg of the epistemic triad. |
| [`critical-thinking/SKILL.md`](critical-thinking/SKILL.md) | 7 disciplines for challenging AI reasoning at decision points. Detailed body for `critical-thinking.instructions.md`. Second leg of the epistemic triad. |
| [`deep-review/SKILL.md`](deep-review/SKILL.md) | Three-perspective adversarial review (Advocate / Skeptic / Architect). Composes with cross-model external critic. |
| [`plan/SKILL.md`](plan/SKILL.md) | Plan-mode discipline — concrete markdown plans with bite-sized tasks, exact file paths, complete code, verification steps. |
| [`problem-framing-audit/SKILL.md`](problem-framing-audit/SKILL.md) | Detailed body for Discipline -1 frame audit — 8-check step-back protocol. |
| [`spike/SKILL.md`](spike/SKILL.md) | Throwaway feasibility experiments — decompose, prototype, return VALIDATED/PARTIAL/INVALIDATED verdicts. Disposable by design. |

Additional skills ship through subsequent Steward proposals per [`constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

Layout convention (matches Steward + Illustrator plugin):

```text
skills/
└── <skill-name>/
    ├── SKILL.md
    ├── references/  (optional)
    ├── scripts/     (optional)
    └── examples/    (optional)
```

See Steward's [`.github/skills/skill-creator/SKILL.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/.github/skills/skill-creator/SKILL.md) for the authoring guide + spec.
