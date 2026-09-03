---
title: A staged payload is not a publication
category: failure-modes
created: 2026-09-03
confidence: high
tags: publishing,branches,marketplace,branch-protection,release,verification
---

## Lesson

Work that looks published — a vendored payload, a metadata file, a feature branch, passing local
validation — is not published until it is merged into the branch consumers read. Verify against
that branch, not against the working copy.

## Context

A plugin appeared to be published to a marketplace repository. It had a payload folder, an upstream
metadata file pinning a version, and a feature branch named for a release. Local inspection showed
a coherent, validated plugin.

It had never been merged. The payload existed only on a branch that had accumulated six commits and
was never opened as a pull request. The default branch contained no trace of it, so no consumer
could ever have installed it.

Three details made the state hard to read. The branch was named for one version while carrying a
later one, so the name was actively misleading. A keyword search of the default branch's catalog
matched several unrelated entries, which briefly looked like confirmation that the plugin was
present. And the working copy was checked out on the feature branch, so every local command
reported the staged state as though it were the published one.

## Signals

- A repository's default branch has never been inspected directly for the artifact in question.
- A long-lived feature branch exists whose name references a version that no longer matches its
  contents.
- A keyword search returns matches, but none has been confirmed to be the specific artifact.
- Local validation passes while nothing has been confirmed about the branch consumers read.
- A publication step was described as complete without naming the commit that carried it.

## Recommended response

- Confirm publication by reading the default branch explicitly: list the artifact path on that ref
  rather than in the working copy, and check the exact identifier rather than a keyword.
- When a search matches, verify the match is the artifact and not a namesake. Alphabetical listings
  help: an absent entry that should sort first is a strong negative signal.
- Read branch protection before choosing a merge route. Required reviews and strict status checks
  determine whether a pull request is mandatory. Administrator bypass may exist, but using it skips
  the validation the gate exists to run.
- Expect a strict status check to require branch currency. Merge the base branch in first, resolve
  conflicts, then re-run the full local gate set to confirm the payload survived the merge intact.
- Separate generated maintenance outputs from the payload change when the project asks for that.
  Catalog, scoring, and index regeneration usually belong to a maintainer step after merge, not to
  the submission.
- Rename a branch before merging when its name no longer describes its contents. The name persists
  in the merge commit.

## Would revise if

The publication path becomes fully automated from a tag, so no branch can hold a staged payload
indefinitely. The verification rule still holds; the branch-state signals would no longer apply.
