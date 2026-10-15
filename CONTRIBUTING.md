# CONTRIBUTING (v0.2)

## Contribution flow
1. Open issue with objective and evidence.
2. Keep scope minimal and coherent.
3. Update docs/index/registry when adding new packs.
4. Run:
   ```bash
   npm ci
   npm run validate
   npm test
   npm run evals
   ```
5. Update `CHANGELOG.md`.

## Quality bar
- No invented schemas.
- Explicit security/accessibility considerations.
- Deterministic validations must pass or limitations must be documented.
