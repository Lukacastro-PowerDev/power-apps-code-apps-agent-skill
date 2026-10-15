# ARCHITECTURE (v0.2)

## Operating model
- Small universal core + domain packs on demand.
- Evidence-first planning before implementation.
- Deterministic quality/security gates.

## Stack matrix
| Area | Recommended | Avoid |
|---|---|---|
| UI | Fluent UI or equivalent accessible system | Inaccessible custom controls |
| Data layer | Generated/typed services | Direct `fetch/axios` bypassing contracts |
| Validation | TypeScript strict + deterministic checks | Untyped runtime assumptions |
| Delivery | Build + validate + test + eval score | Shipping without evidence/report |

## Maturity matrix
| Level | Characteristics |
|---|---|
| M1 | Evidence docs + schema mapping |
| M2 | Security and accessibility checks |
| M3 | Deterministic validators and evals |
| M4 | Domain-pack governance and ALM discipline |
