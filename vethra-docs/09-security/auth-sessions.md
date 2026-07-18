# Auth & Sessions

See also `AUTH_FLOW.md`.

## Session cookie

- `httpOnly: true`
- `sameSite: 'lax'` (or `none` + secure if cross-site deploy)
- `secure: true` in production
- Store in Mongo via `connect-mongo`

## Login

1. Verify password
2. Regenerate session
3. Set `userId` / role in session
4. Return safe user

## Logout

Destroy session + clear cookie.
