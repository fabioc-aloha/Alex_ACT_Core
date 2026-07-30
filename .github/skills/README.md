# Skills

31 skills ship as of Batch 10 (2026-07-30):

| File | Role |
| --- | --- |
| [`anti-hallucination/SKILL.md`](anti-hallucination/SKILL.md) | Prevent fabrication at generation point (input-discipline + output-discipline signals). First leg of the epistemic triad. |
| [`ai-memory-setup/SKILL.md`](ai-memory-setup/SKILL.md) | Resolve and use the `Alex_ACT_Memory` sibling repo as shared memory bus — announcements, feedback, shared knowledge; optional per project. |
| [`big-idea/SKILL.md`](big-idea/SKILL.md) | Distill the central claim before summary-shaped output (hero copy, commit subjects, PR titles, ADR titles, executive summaries). 6-step distill tested against Saint-Exupéry's removal rule. |
| [`browser-tools/SKILL.md`](browser-tools/SKILL.md) | VS Code 1.127+ browser tools — file:// local rendering (HTML/SVG/PNG/PDF), bot-protection escape, password-hand-off protocol (never `type_in_page` on secrets). |
| [`code-review/SKILL.md`](code-review/SKILL.md) | Systematic code review for correctness, security, and growth — not just style. Composes with security-and-hardening + adversarial-review. |
| [`critical-thinking/SKILL.md`](critical-thinking/SKILL.md) | 7 disciplines for challenging AI reasoning at decision points. Detailed body for `critical-thinking.instructions.md`. Second leg of the epistemic triad. |
| [`deep-review/SKILL.md`](deep-review/SKILL.md) | Three-perspective adversarial review (Advocate / Skeptic / Architect). Composes with cross-model external critic. |
| [`doc-hygiene/SKILL.md`](doc-hygiene/SKILL.md) | Anti-drift rules for living documents — count elimination, single source of truth per metric, link-integrity checker, orphan detection, docs-as-architecture. |
| [`docx-to-md/SKILL.md`](docx-to-md/SKILL.md) | Convert Word (.docx) → clean Markdown with image extraction and pandoc cleanup. Muscle at [`docx-to-md/scripts/docx-to-md.cjs`](docx-to-md/scripts/docx-to-md.cjs). |
| [`git-workflow/SKILL.md`](git-workflow/SKILL.md) | Detailed git procedures — branch hygiene, safe-commit patterns, recovery from lost commits + bad merges + accidental pushes. |
| [`html-to-md/SKILL.md`](html-to-md/SKILL.md) | Convert HTML → clean Markdown via pandoc. Muscle at [`html-to-md/scripts/html-to-md.cjs`](html-to-md/scripts/html-to-md.cjs). |
| [`humanizer/SKILL.md`](humanizer/SKILL.md) | Remove 29 AI-writing patterns via draft → self-audit → rewrite. Optional voice-calibration from user-provided writing sample. |
| [`lint-clean-markdown/SKILL.md`](lint-clean-markdown/SKILL.md) | Write markdown that passes markdownlint on first attempt — encode common rules (MD012, MD022, MD040, MD024, MD029) as muscle memory. |
| [`markdown-mermaid/SKILL.md`](markdown-mermaid/SKILL.md) | Config-driven Mermaid authoring — init directive + classDef vocabulary from `.github/config/brand-palette.json`; bundled `references/` for pitfalls + tool ecosystem + diagram selection. |
| [`markdown-sanitization-chain/SKILL.md`](markdown-sanitization-chain/SKILL.md) | Render user-supplied markdown safely: marked.js → DOMPurify → Mermaid. Order matters — skipping sanitizer is XSS. |
| [`mcp-builder/SKILL.md`](mcp-builder/SKILL.md) | Build MCP servers in Python (FastMCP), Node/TypeScript (MCP SDK), or C#/.NET (Microsoft MCP SDK). Build vs Use Existing decision matrix + implementation patterns + testing checklist. |
| [`md-to-eml/SKILL.md`](md-to-eml/SKILL.md) | Convert Markdown → RFC 5322 email (.eml) with inline CSS + CID images. Muscle at [`md-to-eml/scripts/md-to-eml.cjs`](md-to-eml/scripts/md-to-eml.cjs). |
| [`md-to-html/SKILL.md`](md-to-html/SKILL.md) | Convert Markdown → standalone HTML with embedded CSS + images + Mermaid. Muscle at [`md-to-html/scripts/md-to-html.cjs`](md-to-html/scripts/md-to-html.cjs). |
| [`md-to-txt/SKILL.md`](md-to-txt/SKILL.md) | Strip Markdown formatting → clean plain text via pandoc. Muscle at [`md-to-txt/scripts/md-to-txt.cjs`](md-to-txt/scripts/md-to-txt.cjs). |
| [`md-to-word/SKILL.md`](md-to-word/SKILL.md) | Convert Markdown (with Mermaid + SVG) → Word (.docx). Muscle at [`md-to-word/scripts/md-to-word.cjs`](md-to-word/scripts/md-to-word.cjs). |
| [`meditation/SKILL.md`](meditation/SKILL.md) | 5-step protocol for consolidating session learning into permanent architecture. Routes patterns to skills/instructions/prompts/scripts/memory tiers by type. |
| [`mutation-testing/SKILL.md`](mutation-testing/SKILL.md) | Meta-test the test harness — apply small intentional defects, expect suite to catch each; surfaces silent coverage gaps hidden by 100% line coverage. |
| [`plan/SKILL.md`](plan/SKILL.md) | Plan-mode discipline — concrete markdown plans with bite-sized tasks, exact file paths, complete code, verification steps. |
| [`problem-framing-audit/SKILL.md`](problem-framing-audit/SKILL.md) | Detailed body for Discipline -1 frame audit — 8-check step-back protocol. |
| [`security-and-hardening/SKILL.md`](security-and-hardening/SKILL.md) | OWASP-aware hardening for user input, auth, storage, external integrations. Three-tier boundary system (Always Do / Ask First / Never Do) + OWASP Top 10 prevention patterns. |
| [`spike/SKILL.md`](spike/SKILL.md) | Throwaway feasibility experiments — decompose, prototype, return VALIDATED/PARTIAL/INVALIDATED verdicts. Disposable by design. |
| [`status-reporting/SKILL.md`](status-reporting/SKILL.md) | Create stakeholder-friendly project status updates and progress reports — audience-adapted output. Composes with communication-craft. |
| [`svg-banner/SKILL.md`](svg-banner/SKILL.md) | Generate 1200×320 SVG banners with pluggable brand config (default Alex ACT). Bundled generator + mark PNG; brand config at `.github/config/{banner-brand,brand-palette}.json`. |
| [`systematic-debugging/SKILL.md`](systematic-debugging/SKILL.md) | 4-phase root-cause-first method (investigate → pattern-analyze → hypothesize → implement); beats guess-and-check thrashing. |
| [`test-driven-development/SKILL.md`](test-driven-development/SKILL.md) | Enforce RED-GREEN-REFACTOR for any feature/bug fix/refactor. Write failing test first, watch it fail, minimal code to pass, refactor. |
| [`token-waste-elimination/SKILL.md`](token-waste-elimination/SKILL.md) | Audit active brain artifacts for context cost, duplicated guidance, oversized routing files, stale metadata. |

The six converter skills bundle executable muscles under `<skill>/scripts/<skill>.cjs` and depend on the shared runtime at `.github/scripts/shared/` (`tool-runner.cjs`, `markdown-preprocessor.cjs`, `mermaid-pipeline.cjs`, `data-uri.cjs`). Runtime prerequisites: **pandoc** on PATH (all 6), **mermaid-cli** on PATH (md-to-html + md-to-word when Mermaid present), **jszip** optional (md-to-word). `svg-banner` and `markdown-mermaid` share `.github/config/brand-palette.json` (6-role semantic palette + typography); `svg-banner` additionally reads `.github/config/banner-brand.json` for structure.

The six converter skills bundle executable muscles under `<skill>/scripts/<skill>.cjs` and depend on the shared runtime at `.github/scripts/shared/` (`tool-runner.cjs`, `markdown-preprocessor.cjs`, `mermaid-pipeline.cjs`, `data-uri.cjs`). Runtime prerequisites: **pandoc** on PATH (all 6), **mermaid-cli** on PATH (md-to-html + md-to-word when Mermaid present), **jszip** optional (md-to-word).

The six converter skills bundle executable muscles under `<skill>/scripts/<skill>.cjs` and depend on the shared runtime at `.github/scripts/shared/` (`tool-runner.cjs`, `markdown-preprocessor.cjs`, `mermaid-pipeline.cjs`, `data-uri.cjs`). Runtime prerequisites: **pandoc** on PATH (all 6), **mermaid-cli** on PATH (md-to-html + md-to-word when Mermaid present), **jszip** optional (md-to-word).

The six converter skills bundle executable muscles under `<skill>/scripts/<skill>.cjs` and depend on the shared runtime at `.github/scripts/shared/` (`tool-runner.cjs`, `markdown-preprocessor.cjs`, `mermaid-pipeline.cjs`, `data-uri.cjs`). Runtime prerequisites: **pandoc** on PATH (all 6), **mermaid-cli** on PATH (md-to-html + md-to-word when Mermaid present), **jszip** optional (md-to-word).

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
