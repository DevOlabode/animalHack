# Model: Reminder

**File:** `backend/models/Reminder.js`

| Field | Type | Required |
|-------|------|----------|
| petId | ObjectId→Pet | yes |
| ownerId | ObjectId→User | yes |
| clinicId | ObjectId→Clinic | no |
| vetId | ObjectId→User | no |
| type | String | yes — medication\|vaccination\|follow_up\|care_instruction |
| title | String | yes |
| message | String | no |
| dueDate | Date | yes |
| prescriptionId | ObjectId | no |
| appointmentId | ObjectId | no |
| emailSent | Boolean | default false |
| timestamps | | |

Indexes: `{ ownerId: 1, dueDate: 1 }`, `{ emailSent: 1, dueDate: 1 }` for cron.
