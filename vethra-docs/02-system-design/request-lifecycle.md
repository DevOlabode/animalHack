# Request Lifecycle

## Happy path

```
Client → Route → isAuthenticated? → role guard → validate(Joi) → controller → model/service → res.json
```

## Auth paths

- Public: clinics list/detail, signup, signin, password reset
- Session required: everything else under `/api` except health

## Idempotency

MVP: no idempotency keys. Clients should disable double-submit on book buttons.

## Pagination

MVP: return full lists for owner/clinic scale. Phase 2: `?page=&limit=`.
