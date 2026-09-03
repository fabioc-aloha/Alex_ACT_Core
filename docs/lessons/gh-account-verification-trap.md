---
title: Switching credentials back before verifying destroys the verification
category: gotchas
created: 2026-09-03
confidence: high
tags: git,github,authentication,multi-account,verification,push
---

## Lesson

When an operation requires switching to a different credential, complete the
verification before switching back. Restoring the previous account first can make
a successful operation indistinguishable from a failed one, because the
verification command now lacks the access it needs.

## Context

A push to a private repository failed because the active CLI account did not own
it. A second authenticated account did. The account was switched, the push
succeeded, and the original account was immediately restored as a courtesy so the
environment was left as found.

That courtesy was the mistake. Every subsequent check against that repository then
failed with the same error as the original failure, so from the outside the push
looked like it had never landed. The next request was to switch accounts and
"complete the push" that was in fact already complete.

The error message is the trap. A private repository returns "Repository not found"
to an unauthorized caller rather than a permission error, because confirming
existence would leak information. That message reads as though the repository does
not exist or the remote is misconfigured, which points at entirely the wrong
cause.

## Signals

- `Repository not found` together with `Authentication failed` for a remote you
  believe exists. Suspect account routing before suspecting the URL.
- More than one authenticated account on the same host.
- A remote owner that does not match the currently active account.
- An operation reported as successful that cannot be confirmed afterwards.

## Recommended response

- Resolve the explicit `owner/repository` and check the account route before any
  operation that reads or writes a remote. Do not assume the active account has
  access.
- Keep the working account active until verification is complete. Confirm with a
  direct remote read, not a local tracking reference, since the tracking
  reference only reflects what a previous command already did.
- Restore the prior account afterwards if that matters, and say which account is
  now active and which remotes that makes unreachable.
- A local tracking ref advancing is real evidence a push succeeded, but it is
  weaker than reading the remote. Prefer the direct read when the stakes justify
  a credential switch.

## Would revise if

A credential helper routes per-remote automatically, so no global active account
exists to switch and restore. The verification-before-restore rule would then be
unnecessary, though verifying against the remote rather than the tracking ref
still holds.
