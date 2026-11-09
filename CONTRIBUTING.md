# CONTRIBUTING

## How to contribute
1. Open an issue describing the gap.
2. Propose changes with clear scope and evidence.
3. Keep examples safe and schema-explicit.
4. Run:
   ```bash
   npm ci
   npm run build
   npm run validate
   npm test
   npm run evals
   ```

## Contribution quality bar
- Keep MUST/SHOULD/MAY distinctions clear.
- Avoid non-verifiable claims.
- Include validations and Definition of Done in skill docs.
- Update `CHANGELOG.md`.
- Add catalog entries for new domain packs and keep paths valid.
- Mark all fictional schemas and fixtures `EXAMPLE ONLY`.
