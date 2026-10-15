# Threat Model

## Objective
Identify assets, trust boundaries, threats, and mitigations.

## Required Inputs
- Task statement and expected outcome.
- Observed repository artifacts (schema/models/services/config/tests).
- Security and compliance constraints.

## Steps
1. Confirm scope and non-goals.
2. Collect only required evidence.
3. Apply relevant pattern/template from `library/index.json`.
4. Implement with typed contracts and explicit UI states.
5. Run validation commands and capture results.

## Decisions
- MUST separate observed facts from assumptions.
- SHOULD choose smallest safe change set.
- MAY propose alternatives with trade-offs.

## Example
```text
Input: Build edit page for SharePoint list ItemRequests.
Observed evidence: src/generated/models/ItemRequestsModel.ts.
Decision: Use templates/page-crud and sharepoint field mapping checklist.
```

## Common Failures
- Inventing schema fields or API behavior.
- Skipping loading/error/empty/success UI states.
- Missing security checks and accessibility review.

## Validations
- `npm run validate`
- `npm test`
- Verify generated files are not manually edited unless task explicitly requires it.

## Definition of Done
- Requirements implemented and traceable to evidence.
- Security + accessibility + quality checks completed.
- Final report includes assumptions, risks, and next steps.
