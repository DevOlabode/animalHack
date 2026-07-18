# Model: Diagnosis

**File:** `backend/models/Diagnosis.js`

| Field | Type | Required |
|-------|------|----------|
| petId | ObjectId→Pet | yes |
| appointmentId | ObjectId→Appointment | no |
| clinicId | ObjectId→Clinic | yes |
| vetId | ObjectId→User | yes |
| diagnosis | String | yes |
| clinicalNotes | String | no |
| treatmentPlan | String | no |
| timestamps | | |

Indexes: `{ petId: 1, createdAt: -1 }`, `{ clinicId: 1 }`.
