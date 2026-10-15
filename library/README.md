# Library usage guide (v0.2)

## Purpose
Machine-readable + human-readable catalog for minimal context loading.

## Sources
- `library/index.json` (compatibility catalog)
- `domains/registry.json` (domain-pack catalog)
- `library/context-index.generated.json` (deterministic file index)

## Workflow
1. Parse task.
2. Generate context plan (`npm run context -- --task "..."`).
3. Load only required artifacts.
4. Expand context only when blockers appear.
