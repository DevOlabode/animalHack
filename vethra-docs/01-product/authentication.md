# Authentication

**Phase:** MVP (Hackathon)

## Objective

Secure registration and login for pet owners and clinic (vet) accounts; session-based access to protected APIs and pages.

## User stories


- As a pet owner, I can sign up with name, email, password so I can manage my pets.
- As a clinic, I can sign up with user + clinic profile fields so I can receive bookings.
- As any user, I can sign in, stay signed in via session, and log out.
- As any user, I can request a password reset email and set a new password.


## Acceptance criteria


- [ ] `POST /api/auth/signup` creates `pet_owner` user
- [ ] `POST /api/auth/signup/clinic` creates `vet` user + `Clinic` document
- [ ] `POST /api/auth/signin` establishes authenticated session
- [ ] `GET /api/auth/me` returns safe user (+ clinic if vet)
- [ ] `POST /api/auth/logout` destroys session
- [ ] Forgot/reset password flow works end-to-end
- [ ] Duplicate email returns clear error
- [ ] Passwords never returned in JSON


## Business rules


- Email unique, stored lowercase
- Password min length 6 (MVP); recommend 8+ in Phase 2
- Role set at signup; users cannot self-elevate to admin
- Clinic signup must create both User and Clinic in one transaction-like flow (fail together)


## Validation rules


| Field | Rules |
|-------|-------|
| email | required, email format |
| password | required, min 6 |
| name | required, trim, max 100 |
| clinic.name/address/phone/email/operatingHours | required on clinic signup |


## Edge cases


- Sign in with wrong password → 401
- Sign up existing email → 409/400 with message
- Reset token expired/invalid → clear error
- Authenticated user hitting signup pages → redirect home


## Permissions


- Public: signup, signin, forgot/reset
- Authenticated: logout, me, profile update


## Data model

See `03-database/users.md`, `03-database/clinics.md`, PasswordReset model.

## API

See `06-api/auth.md` and `AUTH_FLOW.md`.

## UI requirements


- Pages: Sign In, Sign Up (owner), Sign Up (clinic), Forgot, Reset
- Loading / inline field errors / toast or banner for server errors


## Error states


- Network failure message
- Validation errors mapped to fields
- Session expired → redirect to sign in


## Future considerations

OAuth (Google), email verification, MFA, JWT access tokens for mobile.
