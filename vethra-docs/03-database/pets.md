# Model: Pet

**File:** `backend/models/Pet.js`

## Schema

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| ownerId | ObjectId→User | yes | | indexed |
| name | String | yes | | trim |
| species | String | yes | | |
| breed | String | yes | | |
| dateOfBirth | Date | yes | | not future |
| weight | Number | yes | | min 0 |
| sex | String | yes | | male\|female\|unknown |
| microchipNumber | String | no | '' | |
| allergies | String | no | '' | |
| medicalConditions | String | no | '' | |
| emergencyContact | String | yes | | |
| photoUrl | String | no | '' | |
| timestamps | | | | |

## Virtual / methods

- `calculateAge()` → human string
- `toSafeObject()` includes `age`

## Indexes

- `ownerId`
- Phase 2: `microchipNumber` sparse unique if non-empty
