# Project agent artifacts

The `.agent/` directory contains task-local working artifacts:

| Artifact | Default status |
|---|---|
| `task.yaml` | temporary task input; do not commit secrets |
| `evidence.json` | versionable when it contains sanitized project evidence |
| `schema-map.json` | versionable project contract |
| `architecture-plan.md` | versionable decision record |
| `security-review.md` | versionable review output |
| `change-plan.md` | temporary or versionable by team policy |
| `validation-result.json` | generated; commit only when used as release evidence |
| `final-report.md` / `final-report.json` | versionable release evidence |

Never put credentials, tokens, tenant identifiers, personal data, or connection
IDs in these files. The repository's YAML configuration example is
documentation only; the local CLI uses JSON or explicit arguments.
