---
description: "Routes legacy Core document-conversion requests to the standalone Document Tools plugin. Use when an older caller invokes Core's compatibility command."
lastReviewed: 2026-08-05
---



# /convert

This is a compatibility command. Document Tools owns all six converters and
their shared runtime. Do not invoke the generic skill tool or reproduce the
format router in Core.

## Steps

1. Verify `alex-act-document-tools@alex-mall` is installed with `copilot plugin list`.
2. If Document Tools is absent, provide `copilot plugin install alex-act-document-tools@alex-mall` and stop until it is loaded.
3. Invoke `/alex-act-document-tools convert` with the original request and files.
4. Preserve Document Tools' format detection, execution, and output validation.

## Would Revise If

Remove this compatibility prompt after **2026-11-05** if supported callers no
longer use the Core namespace.
