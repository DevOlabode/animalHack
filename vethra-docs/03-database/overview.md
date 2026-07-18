# Database Overview

**ODM:** Mongoose  
**DB:** MongoDB

## Collections (MVP)

| Collection | Model file | Purpose |
|------------|------------|---------|
| users | User.js | Accounts |
| clinics | Clinic.js | Public clinic profiles |
| pets | Pet.js | Patient animals |
| appointments | Appointment.js | Booking workflow |
| diagnoses | Diagnosis.js | Clinical diagnoses |
| prescriptions | Prescription.js | Medications |
| reminders | Reminder.js | Scheduled care reminders |
| treatmenttasks | TreatmentTask.js | Owner compliance tasks |
| medicaldocuments | MedicalDocument.js | Uploaded files metadata |
| passwordresets | PasswordReset.js | Reset tokens |

## Future collections

`posts`, `articles`, `reviews`, `notifications`, `clinicstaff`

## Conventions

- All models: `timestamps: true` → `createdAt`, `updatedAt`
- Refs use ObjectId + `ref`
- Never store plaintext passwords
- Prefer soft business deletes later; MVP hard delete pets with guards
