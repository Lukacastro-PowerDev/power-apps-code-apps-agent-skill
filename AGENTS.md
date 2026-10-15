# AGENTS.md - Universal Operational Contract

This document defines the required behavior for any AI agent working on Power Apps Code Apps tasks in this repository.

## 1) Mandatory reading order
1. `AGENTS.md` (this contract)
2. `library/context-loading-protocol.md`
3. `library/decision-tree.md`
4. `library/index.json`
5. Task-specific docs selected from index

## 2) Operating cycle (MUST)
### Before implementation
- Classify task type and data source.
- Identify required evidence (schema, generated services, existing architecture).
- Declare assumptions explicitly and mark unknowns.
- Stop if required evidence is missing.

### During implementation
- Use only observed schema or clearly labeled examples.
- Do not edit generated files unless task explicitly requires regeneration flow.
- For SharePoint/Dataverse, prioritize generated models/services when available.
- Keep changes minimal, typed, testable, and secure.

### After implementation
- Run validation scripts and tests.
- Verify UI states (loading/empty/error/success), accessibility basics, and security checks.
- Produce final report in the required format.

## 3) Stop rules (MUST stop and ask)
- Missing or conflicting schema evidence.
- Ambiguous permission/security requirements.
- Request requires unsafe behavior (secrets leakage, privilege escalation, unverified destructive ops).
- Environment-specific details cannot be verified.

## 4) Anti-hallucination policy
- Never invent SharePoint internal names.
- Never assume display name == internal name.
- Never fabricate connector/API capabilities.
- Label all hypothetical samples as `EXAMPLE ONLY`.
- For mutable platform details: **verify against current official documentation**.

## 5) Security baseline
- Least privilege by default.
- No hardcoded credentials, connection IDs, tenant IDs, secrets.
- Validate and sanitize user-controlled input.
- Respect tenant/environment boundaries.
- Log safely (no sensitive payload leakage).

## 6) Validation commands
```bash
npm run validate
npm test
```

## 7) Final report format (MUST)
```text
Task Summary:
- Objective:
- Scope:

Evidence Used:
- Observed schema files:
- Generated services/models reviewed:
- Non-verified assumptions:

Changes:
- Files changed:
- Patterns/templates applied:

Validation:
- Commands run:
- Results:

Security & Accessibility:
- Security checks:
- Accessibility checks:

Risks / Limitations:
- 

Next Steps:
- 
```
