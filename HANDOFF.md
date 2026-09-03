# Handoff

Durable cross-session state for Alex ACT Core and the packages that mirror it. Session-scoped
notes do not survive; anything here is meant to be picked up cold.

Last updated: 2026-09-03

## Open items

### 1. MD060 table-delimiter findings — decision needed

`markdownlint` 0.41 added `MD060/table-column-style`, which postdates both this repository and the
Scout package. Neither corpus complies.

| Repository | Findings | Files | Scope |
| --- | --- | --- | --- |
| Alex ACT Core | 341 | 25 | repo-wide; 94 of them across 9 instruction files |
| Alex ACT Scout | 382 | 26 | all in `skills/**/*.md` |

Counts verified 2026-09-03 against `markdownlint-cli2` 0.23.2 with each repository's own
configuration. Do not carry these forward without re-running; an earlier informal estimate of "16
files" was wrong and nearly reached this document.

The rule wants consistent pipe spacing around table delimiters. Both corpora use the compact
`|---|---|` form throughout, so this is an established style choice meeting a newer default rather
than a defect that accumulated.

Neither repository runs `markdownlint` in CI, so nothing is failing today. Both now carry a
`.markdownlint.json` that disables `MD013` and sets `MD024: siblings_only`; neither disables
`MD060`.

Three options:

1. **Disable `MD060`** in both configs, consistent with how `MD013` and `MD024` are already
   handled. Cheapest, and defensible on the same grounds: the config exists to codify these
   repositories' conventions against stricter newer defaults.
2. **Reflow all 723 delimiters.** A large mechanical diff across files that are otherwise
   untouched, with no behavioural benefit.
3. **Leave it.** Local linting reports findings that nobody intends to fix, which trains people to
   ignore lint output.

Option 1 is the likely answer, but it was deliberately not taken unilaterally: silencing a rule to
make a count go away deserves an explicit decision rather than a quiet config edit.

Every file touched in the 2026-09-03 session lints clean under the current configuration.

### 2. Controlled ensembling trial — evidence gap

The `humanizer` skill's Copywriter Mode recommends ensembling for high-stakes copy: several blind
close reads with an identical brief, unioned, with agreement count read as a confidence tier. The
`## Would Revise If` section names a controlled N-run trial as the test that would confirm or
refute it.

That trial has not been run. The evidence currently behind the recommendation is **directional
only**. Three review passes over one 35-file corpus produced 23 distinct findings with 2 common to
all three, but the runs varied brief as well as method, so method difference, brief difference, and
sampling noise are confounded and no divergence rate can be extracted from them. It was also a
single corpus in a single domain.

What the trial needs:

- One corpus, held constant.
- One brief, held constant across every run. Varying it measures the brief.
- N runs varying only the sampling seed, blind to each other.
- Union the findings per run and plot how the union grows with N.

What it would answer: how many passes are enough. If the union plateaus at three runs, the skill
can name three instead of vaguely recommending more than one. If it is still growing at five, the
current guidance understates the floor.

This stays N=1 corpus, so it calibrates rather than generalizes. That limit should be stated
wherever the resulting number is used.

## Related records

Durable lessons from the 2026-09-03 session are in [`docs/lessons/`](docs/lessons/index.md). The
two most relevant to the items above are `review-reproducibility.md`, which records why the
divergence was mislabelled as reviewer variance rather than instrument sampling, and
`staged-is-not-published.md`, which covers verifying a publication against the branch consumers
read.
