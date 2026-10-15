# Decision Tree

```mermaid
flowchart TD
  A[Incoming task] --> B{Task type?}
  B -->|Discovery| D1[Load skills/discovery]
  B -->|Implementation| I1[Load implementation + datasource docs]
  B -->|Security review| S1[Load skills/security + tests/security]
  B -->|Architecture| AR1[Load skills/architecture + ARCHITECTURE.md]

  I1 --> DS{Data source?}
  DS -->|SharePoint| SP[Load skills/sharepoint + schema evidence]
  DS -->|Dataverse| DV[Load skills/dataverse + environment constraints]
  DS -->|Mixed/Unknown| MX[Run discovery first]

  SP --> P{Page pattern?}
  P -->|CRUD| T1[templates/page-crud]
  P -->|Dashboard| T2[templates/page-dashboard]
  P -->|Master-detail| T3[templates/page-master-detail]
  P -->|Approval| T4[templates/page-approval-workflow]

  T1 --> R{Review level}
  R -->|Standard| Q1[Run validate + tests]
  R -->|High risk| Q2[Add security review template + strict checklist]
```

## Review levels
- **Standard**: regular feature scope with known schema.
- **Elevated**: permission-sensitive, PII-related, or cross-environment data.
- **High risk**: auth/security boundary changes, uncertain schema, external integrations.
