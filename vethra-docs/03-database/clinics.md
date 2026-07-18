# Model: Clinic

**File:** `backend/models/Clinic.js`

## Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| userId | ObjectId→User | yes | unique (1:1 MVP) |
| name | String | yes | |
| description | String | no | default '' |
| address | String | yes | |
| phone | String | yes | |
| email | String | yes | lowercase |
| operatingHours | String | yes | free text MVP |
| createdAt / updatedAt | Date | auto | |

## Phase 2 fields (add later)

```
location: { type: Point, coordinates: [lng, lat] }
values: String
services: [String]
team: [{ name, title, photoUrl, bio }]
ratingAverage: Number
ratingCount: Number
```

## Indexes

- unique: `userId`
- text (Phase 2): name, address
