# Middleware

## Auth

**File:** `backend/middleware/auth.js`

| Export | Behavior |
|--------|----------|
| `isAuthenticated` | Requires `req.session.userId` (or equiv); else 401 |
| Loads `req.user` | Safe user document |

## Roles

**File:** `backend/middleware/roles.js`

| Export | Allows |
|--------|--------|
| `isPetOwner` | role in `pet_owner`, `owner` |
| `isVet` | role `vet` |
| `isAdmin` | role `admin` (reserved) |

## Target: validate middleware

```js
// backend/middleware/validate.js
module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: error.details.map(d => ({ field: d.path.join('.'), message: d.message })),
    });
  }
  req.body = value;
  next();
};
```

## Error middleware

Central `(err, req, res, next)` — map known errors; log unexpected; return 500 without stack in production.

## Security middleware (add if missing)

- `helmet`
- `cors({ origin: CLIENT_URL, credentials: true })`
- Rate limit auth routes (Phase 2 / stretch)
