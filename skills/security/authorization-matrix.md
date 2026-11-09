# Authorization matrix

Use `core/evidence/permission-matrix.schema.json` and record each role,
resource, operation, scope, and evidence reference. Start with read-only
access and add create/update/delete/admin only when the project requirement and
evidence justify it. Never infer authorization from a display label.
