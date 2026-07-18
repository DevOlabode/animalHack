# Model: User

**File:** `backend/models/User.js`

## Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| email | String | yes | unique, lowercase, trim |
| password | String | yes | bcrypt hashed, minlength 6 |
| name | String | yes | trim |
| role | String | yes | enum: `pet_owner` \| `owner` \| `vet` \| `admin`; default `pet_owner` |
| createdAt | Date | auto | |
| updatedAt | Date | auto | |

## Methods

- `comparePassword(password)`
- `toSafeObject()` — strips password
- statics: `findByEmail`, `create`, `verifyPassword`, `toSafeUser`

## Indexes

- unique: `email`

## Business rules

- Role immutable via profile update (admin-only change later)
- `owner` is legacy alias of `pet_owner`

## Validation (Joi signup)

```
email: string.email.required
password: string.min(6).required
name: string.min(1).max(100).required
```
