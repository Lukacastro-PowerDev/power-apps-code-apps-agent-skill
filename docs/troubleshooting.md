# Troubleshooting

- Validation failed on links: run `npm run validate:docs` and fix missing paths.
- Security gates failed: run `npm run validate:security` and remove secrets/tenant-bound values.
- Context confidence low: refine task text and include datasource explicitly.
