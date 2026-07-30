# Skills

13 skills ship as of Batch 5 (2026-07-30):

| File | Role |
| --- | --- |
| [`anti-hallucination/SKILL.md`](anti-hallucination/SKILL.md) | Prevent fabrication at generation point (input-discipline + output-discipline signals). First leg of the epistemic triad. |
| [`critical-thinking/SKILL.md`](critical-thinking/SKILL.md) | 7 disciplines for challenging AI reasoning at decision points. Detailed body for `critical-thinking.instructions.md`. Second leg of the epistemic triad. |
| [`deep-review/SKILL.md`](deep-review/SKILL.md) | Three-perspective adversarial review (Advocate / Skeptic / Architect). Composes with cross-model external critic. |
| [`docx-to-md/SKILL.md`](docx-to-md/SKILL.md) | Convert Word (.docx) → clean Markdown with image extraction and pandoc cleanup. Muscle at [`docx-to-md/scripts/docx-to-md.cjs`](docx-to-md/scripts/docx-to-md.cjs). |
| [`html-to-md/SKILL.md`](html-to-md/SKILL.md) | Convert HTML → clean Markdown via pandoc. Muscle at [`html-to-md/scripts/html-to-md.cjs`](html-to-md/scripts/html-to-md.cjs). |
| [`md-to-eml/SKILL.md`](md-to-eml/SKILL.md) | Convert Markdown → RFC 5322 email (.eml) with inline CSS + CID images. Muscle at [`md-to-eml/scripts/md-to-eml.cjs`](md-to-eml/scripts/md-to-eml.cjs). |
| [`md-to-html/SKILL.md`](md-to-html/SKILL.md) | Convert Markdown → standalone HTML with embedded CSS + images + Mermaid. Muscle at [`md-to-html/scripts/md-to-html.cjs`](md-to-html/scripts/md-to-html.cjs). |
| [`md-to-txt/SKILL.md`](md-to-txt/SKILL.md) | Strip Markdown formatting → clean plain text via pandoc. Muscle at [`md-to-txt/scripts/md-to-txt.cjs`](md-to-txt/scripts/md-to-txt.cjs). |
| [`md-to-word/SKILL.md`](md-to-word/SKILL.md) | Convert Markdown (with Mermaid + SVG) → Word (.docx). Muscle at [`md-to-word/scripts/md-to-word.cjs`](md-to-word/scripts/md-to-word.cjs). |
| [`meditation/SKILL.md`](meditation/SKILL.md) | 5-step protocol for consolidating session learning into permanent architecture. Routes patterns to skills/instructions/prompts/scripts/memory tiers by type. |
| [`plan/SKILL.md`](plan/SKILL.md) | Plan-mode discipline — concrete markdown plans with bite-sized tasks, exact file paths, complete code, verification steps. |
| [`problem-framing-audit/SKILL.md`](problem-framing-audit/SKILL.md) | Detailed body for Discipline -1 frame audit — 8-check step-back protocol. |
| [`spike/SKILL.md`](spike/SKILL.md) | Throwaway feasibility experiments — decompose, prototype, return VALIDATED/PARTIAL/INVALIDATED verdicts. Disposable by design. |

The six converter skills bundle executable muscles under `<skill>/scripts/<skill>.cjs` and depend on the shared runtime at `.github/scripts/shared/` (`tool-runner.cjs`, `markdown-preprocessor.cjs`, `mermaid-pipeline.cjs`, `data-uri.cjs`). Runtime prerequisites: **pandoc** on PATH (all 6), **mermaid-cli** on PATH (md-to-html + md-to-word when Mermaid present), **jszip** optional (md-to-word).

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
