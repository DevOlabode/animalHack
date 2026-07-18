# Model: Prescription

**File:** `backend/models/Prescription.js`

| Field | Type | Required |
|-------|------|----------|
| petId | ObjectId→Pet | yes |
| appointmentId | ObjectId→Appointment | no |
| diagnosisId | ObjectId→Diagnosis | no |
| clinicId | ObjectId→Clinic | yes |
| vetId | ObjectId→User | yes |
| medicationName | String | yes |
| dosage | String | yes |
| frequency | String | yes |
| duration | String | yes |
| instructions | String | no |
| isActive | Boolean | default true |
| timestamps | | |

Indexes: `{ petId: 1, isActive: 1 }`.
