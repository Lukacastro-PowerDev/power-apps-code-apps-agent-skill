# Library usage guide

## Purpose
Provide a machine-readable and human-readable catalog for selecting minimal context.

## How to query
1. Read `library/index.json`.
2. Filter by:
   - `category`
   - `tags`
   - task keywords in `whenToUse`
3. Load only matched artifacts.
4. Re-evaluate after each decision checkpoint.

## Minimum-context policy
- Do not load full repository by default.
- Load incremental context based on confidence gaps.
- Stop and ask when required evidence is missing.
