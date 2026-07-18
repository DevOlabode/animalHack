# Error Handling

## Response shape

```json
{
  "error": "Human readable message",
  "code": "VALIDATION_ERROR",
  "details": [{ "field": "reason", "message": "Reason is required" }]
}
```

Success:

```json
{ "data": { } }
```

Or legacy direct objects — **standardize on `{ data }` / `{ error }` going forward**.

## HTTP status

| Status | When |
|--------|------|
| 400 | Validation / bad input |
| 401 | Not authenticated |
| 403 | Authenticated but not allowed |
| 404 | Missing resource |
| 409 | Conflict (email exists, slot taken) |
| 413 | Upload too large |
| 500 | Unexpected |

See `ERROR_CODES.md`.
