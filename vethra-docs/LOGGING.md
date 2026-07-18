# Logging

## MVP

`console.error` / `console.info` with context:

```
[appointments.book] conflict clinicId=... slot=...
[email] failed template=appointmentBooked err=...
```

## Do not log

- Passwords
- Full session cookies
- Password reset raw tokens
- Unnecessary PII in production logs

## Phase 2

Structured logger (pino/winston) + request id middleware.
