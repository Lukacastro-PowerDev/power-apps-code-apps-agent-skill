# ARCHITECTURE

## Stack matrix
| Area | Recommended | Acceptable | Avoid |
|---|---|---|---|
| Front-end | React + TypeScript + Vite | Vue/other with strict typing and tests | Untyped JS-only apps |
| UI | Fluent UI / accessible library | Any accessible component system | Custom controls without accessibility checks |
| Data layer | Generated services + typed adapters | Repository abstraction with runtime validation | Direct `fetch/axios` bypassing generated contracts |
| Validation | TypeScript strict + schema validation | Type-safe forms with guard functions | Implicit any + unchecked payload assembly |
| Testing | Unit + integration + smoke/e2e | Unit + integration | No automated validation |

## Project maturity matrix
| Level | Characteristics |
|---|---|
| M0 | Basic docs, no schema governance |
| M1 | Schema docs + generated services used |
| M2 | Security + accessibility DoD enforced |
| M3 | Automated validation and prompt evaluations |
| M4 | Continuous quality benchmarking and governance |

## Core principles
- Feature modules with clear boundaries.
- DTO/ViewModel separation when backend contracts differ from UI needs.
- Centralized service access layer and transformation helpers.
- Explicit loading, empty, success, and error states.
