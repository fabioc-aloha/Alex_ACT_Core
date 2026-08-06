---
description: "Routes legacy Core VS Code baseline apply requests to Manager's canonical consent-gated workflow. Use when an older caller invokes Core's compatibility command."
lastReviewed: 2026-08-05
---

# Configure VS Code

This is a compatibility command. Manager owns the portable user baseline.
Do not invoke the generic skill tool or reproduce the workflow in Core.

Steps:

1. Verify `alex-act-manager@alex-mall` is installed with `copilot plugin list`.
2. If Manager is absent, provide `copilot plugin install alex-act-manager@alex-mall` and stop until it is loaded.
3. Invoke `/alex-act-manager configure-vscode`.
4. Preserve Manager's preview, separate consent, comment-safe merge, and read-back verification.

## Would Revise If

Remove this compatibility prompt after **2026-11-05** if supported callers no
longer use the Core namespace.
