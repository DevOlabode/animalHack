# Auth Flow

## Sign up owner

```
POST /api/auth/signup → create User(pet_owner) → session → return safe user
```

## Sign up clinic

```
POST /api/auth/signup/clinic → create User(vet) → create Clinic(userId) → session
```

If clinic create fails, delete user (compensation) or use transaction-like cleanup.

## Sign in

```
POST /api/auth/signin → verify password → regenerate session → return user (+ clinic)
```

## Session restore

```
App load → GET /api/auth/me → AuthContext.user
```

401 → treat as logged out.

## Password reset

1. `forgot-password` creates PasswordReset token hash + email link
2. User opens `/reset-password?token=`
3. `reset-password` validates token, sets password, invalidates token

## Future JWT

Mobile clients may use access/refresh tokens; web can keep cookies. Do not rip out sessions during hackathon.
