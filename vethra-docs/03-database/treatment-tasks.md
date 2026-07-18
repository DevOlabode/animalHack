# Model: TreatmentTask

**File:** `backend/models/TreatmentTask.js`

| Field | Type | Required |
|-------|------|----------|
| petId | ObjectId→Pet | yes |
| ownerId | ObjectId→User | yes |
| reminderId | ObjectId | no |
| prescriptionId | ObjectId | no |
| title | String | yes |
| description | String | no |
| status | String | completed\|missed\|in_progress; default in_progress |
| dueDate | Date | yes |
| timestamps | | |
