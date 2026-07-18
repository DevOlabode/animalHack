# Backend Overview

**Stack:** Node.js · Express · Mongoose · Joi (target) · Session auth · Nodemailer/Brevo

## Responsibilities

- REST JSON API under `/api`
- Authentication & role enforcement
- Business rules for pets, clinics, appointments, medical records
- Email side effects
- File metadata persistence (and upload when configured)

## Entry

`backend/src/index.js` — loads env, connects Mongo, mounts routes, starts server.

## Route modules (current)

| Mount | File | Domain |
|-------|------|--------|
| `/api/auth` | routes/auth.js | Auth |
| `/api/profile` | routes/profile.js | Profile |
| `/api/pets` | routes/pets.js | Pets |
| `/api/clinics` | routes/clinics.js | Clinics |
| `/api/appointments` | routes/appointments.js | Appointments |
| `/api/medical` | routes/medical.js | Timeline, Rx, etc. |

## Controllers

`auth`, `passwordReset`, `profile`, `pets`, `clinics`, `appointments`, `medical`

## Implementation rules for AI agents

1. One controller function per endpoint behavior
2. Validate with Joi before mutating
3. Check ownership before update/delete
4. Return consistent error codes from `ERROR_CODES.md`
5. Never leak password hashes
6. Prefer services for email + multi-model orchestration
