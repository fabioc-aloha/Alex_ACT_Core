---
title: A stochastic reviewer needs ensembling, not a second opinion
category: procedures
created: 2026-09-03
confidence: medium
tags: llm,sampling,review,ensembling,confounds,experiment-design
---

## Lesson

When a review step is executed by a language model, its output is one sample from a stochastic
process. Two runs over the same material will diverge. Design for that with repeated runs and a
union of findings, rather than treating a single clean report as coverage or a disagreement as a
difference of expert opinion.

## Context

Three language-review passes were run over one documentation corpus. Two of them read every
sentence, and each missed the other's two highest-ranked findings. Both reported the corpus as
being in good shape.

That result was initially written up as a discovery about reviewer variance. It is not. Model
sampling is non-deterministic by construction, so divergence between runs is the expected
behaviour of the instrument and should have been predicted rather than observed with surprise.

The experiment also could not support the interpretation placed on it. The second and third runs
used different briefs, because the brief was revised between them. Method difference, brief
difference, and sampling noise are therefore confounded, and no clean divergence rate can be
extracted. It was also a single corpus in a single domain.

The misreading had a practical cost beyond the wording. Framed as expert disagreement, the remedy
looks like commissioning a costly second reviewer, and a single-source finding looks suspect.
Framed as sampling variance, the remedy is cheap repetition, and a single-source finding is simply
the expected tail of a sampled distribution. In this exercise the highest-value finding of the
whole comparison appeared in exactly one run.

## Signals

- A review, classification, or extraction step is performed by a language model.
- Two runs disagree and the disagreement is being explained in terms of judgement or expertise.
- A single clean model-generated report is being treated as evidence of coverage.
- Findings are ranked by how many runs produced them, and low-count findings are being discarded.
- A comparison between runs varied more than one thing at a time.

## Recommended response

- Hold the brief identical across runs. Varying it measures the brief, not the material.
- Run each pass blind to the others. A run with access to prior output converges on it, which
  manufactures agreement rather than testing it.
- Union the findings. Absence from one run is not rejection unless that run explicitly considered
  and rejected the item.
- Use agreement count as a confidence tier rather than a filter: found by every run means act
  first, found once means it still needs a judgement call.
- Before claiming a rate or a magnitude, check what varied between runs. If more than one thing
  did, the number conflates them and should be reported as directional only.

## Would revise if

A controlled trial — same corpus, same brief, varying only the sampling seed — shows repeated runs
converging on substantially the same findings. Ensembling would then be unnecessary overhead for
this class of task. Equally, if such a trial shows the union still growing at five runs, the
guidance understates how many passes are needed and should name a higher floor.
