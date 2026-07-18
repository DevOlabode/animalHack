# Testing Strategy

## Layers

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Node test / Vitest | helpers, status transitions |
| Integration | supertest (add) | API + Mongo memory/server |
| E2E | Playwright (stretch) | Demo path |
| Manual | Acceptance checklist | Judging rehearsal |

## Priority for hackathon

1. Manual acceptance of demo script
2. Unit tests for appointment transitions
3. Smoke API tests for auth + book + confirm
