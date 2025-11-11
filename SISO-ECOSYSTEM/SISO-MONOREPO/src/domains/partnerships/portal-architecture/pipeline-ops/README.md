# Pipeline Ops

- Scope: CRM-style flows for sourcing and progressing deals.
- Spec: docs/partners/PARTNERSHIP-PAGES-PLAN.md (Pipeline Ops)
- Routes: see nested folders.
- Code staging:
  - `domain/` — types shared by prospects / deals / recruitment flows.
  - `infrastructure/` — mock + future API clients (currently `mockPipelineOpsApi`).
  - `application/` — cached service helpers imported by future `/partner/*` routes.
