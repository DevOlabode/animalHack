# Auth API

## POST `/api/auth/signup`

**Auth:** none  
**Body:** `{ name, email, password }`  
**Success:** 201 `{ data: { user } }` + session  
**Errors:** 400 validation; 409 email taken (`EMAIL_TAKEN`)

## POST `/api/auth/signup/clinic`

**Body:** user fields + clinic fields (`name`, `description`, `address`, `phone`, `email`, `operatingHours`)  
**Success:** 201 user role `vet` + clinic  
**Errors:** 400/409

## POST `/api/auth/signin`

**Body:** `{ email, password }`  
**Success:** 200 `{ data: { user, clinic? } }`  
**Errors:** 401 `INVALID_CREDENTIALS`

## POST `/api/auth/logout`

**Auth:** required  
**Success:** 200

## GET `/api/auth/me`

**Auth:** required  
**Success:** `{ data: { user, clinic? } }`

## POST `/api/auth/forgot-password`

**Body:** `{ email }`  
**Success:** 200 always (no email enumeration)

## POST `/api/auth/reset-password`

**Body:** `{ token, password }`  
**Errors:** 400 invalid/expired token
