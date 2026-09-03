---
title: One expert review pass is a sample, not a census
category: failure-modes
created: 2026-09-03
confidence: high
tags: review,reproducibility,copy-review,audit,second-reader
---

## Lesson

Two independent reviewers reading the same material to the same brief can each
miss the other's highest-ranked findings entirely. Treat a single careful review
pass as a sample of what is there, not a complete account of it.

## Context

A controlled comparison ran three independent language reviews over one 35-file
documentation corpus, same audience and same rubric: a mechanical pattern sweep,
a blind close read, and a blind two-phase run. Reviewers two and three both read
every sentence and had no access to each other's output.

Twenty-three distinct findings emerged. Only two were found by all three. More
pointedly, reviewer three found zero of reviewer two's top two findings, and
reviewer two found zero of reviewer three's top two. Both reported the corpus as
being in good shape, and both were right about different subsets of it.

Variance between competent reviewers turned out to be a larger effect than
variance between review methods.

## Signals

- A review returns "this is clean" or a short finding list, and the reviewer read
  carefully rather than skimming. Cleanliness is not evidence of completeness.
- Two reviewers disagree not about a judgement but about whether an item exists
  at all. That is a coverage gap, not a difference of opinion.
- A single reviewer's priority ordering is treated as the priority ordering.

## Recommended response

- Commission a second independent pass, blind to the first, for anything
  expensive to get wrong in public: a landing page, a launch announcement, a
  title, a public API surface.
- Merge rather than replace. A finding that only one reviewer produced is not
  weaker for being single-source unless the other reviewer explicitly considered
  and rejected it.
- Use a third pass for arbitration rather than volume. In this comparison the
  third run's most valuable output was not its four new findings but settling one
  disputed item and confirming another that a single reviewer had missed.
- Keep the reviewers genuinely independent. A second pass by someone who has seen
  the first inherits its answers and produces agreement that means nothing.

## Would revise if

Two independent blind passes over the same material agree on most of each other's
top findings across three separate corpora. That would make the second-reader
recommendation over-engineering, and a single pass plus a mechanical sweep would
be the right cost. Conversely, if a third pass keeps overturning findings that two
passes agreed on, two readers is not enough for high-stakes material.
