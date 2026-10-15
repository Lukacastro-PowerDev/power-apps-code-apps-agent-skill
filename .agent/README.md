# .agent artifacts

This folder stores task execution artifacts for a specific project run.

## Typical files
- `task.yaml` (temporary): normalized task statement and constraints.
- `evidence.json` (versionable when useful): collected evidence records.
- `schema-map.json` (versionable): SharePoint/Dataverse schema mapping used by implementation.
- `architecture-plan.md` (versionable): architecture decisions and trade-offs.
- `security-review.md` (versionable): security checks and findings.
- `change-plan.md` (temporary): execution checklist for current task.
- `validation-result.json` (versionable): deterministic validation outcomes.
- `final-report.md` and `final-report.json` (versionable): final report in universal format.

## Rule
Never store credentials, tenant IDs, connection IDs, or personal data in this folder.
