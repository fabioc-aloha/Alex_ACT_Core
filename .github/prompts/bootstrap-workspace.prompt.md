---
description: "Routes legacy Core workspace-bootstrap requests to Manager's canonical preview-first workflow. Use when an older caller invokes Core's compatibility command."
lastReviewed: 2026-08-05
---

# /bootstrap-workspace

This is a compatibility command. Manager owns repository workspace bootstrap.
Do not invoke the generic skill tool or reproduce the workflow in Core.

Steps:

1. Verify `alex-act-manager@alex-mall` is installed with `copilot plugin list`.
2. If Manager is absent, provide `copilot plugin install alex-act-manager@alex-mall` and stop until it is loaded.
3. Invoke `/alex-act-manager bootstrap-workspace` with the user's target path and options.
4. Preserve Manager's preview, explicit-consent, apply, and idempotence checks.

## Would Revise If

Remove this compatibility prompt after **2026-11-05** if supported callers no
longer use the Core namespace.
