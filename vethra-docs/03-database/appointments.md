# Model: Appointment

**File:** `backend/models/Appointment.js`

## Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| petId | ObjectId→Pet | yes | |
| ownerId | ObjectId→User | yes | |
| clinicId | ObjectId→Clinic | yes | |
| vetId | ObjectId→User | yes | clinic owner user MVP |
| date | Date | yes | appointment day |
| time | String | yes | e.g. "09:30" |
| reason | String | yes | owner problem description |
| status | String | yes | pending\|confirmed\|cancelled\|completed; default pending |
| cancellationReason | String | no | **add if missing** — required when cancelling |
| cancelledBy | String | no | **add** owner\|clinic |
| declineReason | String | no | optional alias stored in cancellationReason |
| timestamps | | | |

## Recommended indexes

```
{ clinicId: 1, date: 1, status: 1 }
{ ownerId: 1, date: -1 }
{ clinicId: 1, date: 1, time: 1 } // uniqueness partial for active statuses
```

## State transitions

See `01-product/appointments.md`.
