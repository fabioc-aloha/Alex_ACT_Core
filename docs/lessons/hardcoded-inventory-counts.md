---
title: A hardcoded inventory count is a distributed edit
category: anti-patterns
created: 2026-09-03
confidence: high
tags: counts,drift,documentation,tests,inventory,doc-hygiene
---

## Lesson

When a count of things is written as a literal in prose, tests, and validation
code, adding one thing becomes an edit in every one of those places. The count
stops describing the inventory and starts constraining it.

## Context

Adding a single always-on instruction to a runtime package required updating that
count in nineteen places across eight files: a bootstrap script that validated it
twice and threw on mismatch, ten test assertions, a skill description, a prompt, a
plugin description, and three prose documents.

The test suite caught the omissions, but only one at a time. Three separate runs
were needed, each surfacing one more site, because the assertions failed in
sequence rather than together. One assertion was a derived value, total minus one
preserved file, so a blanket find-and-replace would have set it wrong.

The package ships a documentation-hygiene capability whose own guidance is count
elimination. The counts predated it.

## Signals

- A number in prose that describes how many components exist.
- A test asserting an exact inventory length rather than a property of the
  inventory.
- Validation code that throws when a count does not match a literal.
- A find-and-replace on a number that touches more than two files.

## Recommended response

- Derive counts from the manifest or the filesystem at read time. Where prose
  genuinely needs a number, generate that section rather than typing it.
- Assert properties instead of totals: that every declared component resolves,
  that the manifest and filesystem agree with each other, that no duplicates
  exist. Those assertions survive an addition; a literal does not.
- When a literal is unavoidable, keep it in exactly one place and have every other
  site read from it.
- Before a blanket replace, list every site and check for derived values. At least
  one is usually total-minus-something and needs a different number.

## Would revise if

The inventory is genuinely fixed by contract, and a change to it should be a
breaking change that fails loudly everywhere. Hardcoded counts are then a feature
rather than debt, and the cost of the distributed edit is the point.
