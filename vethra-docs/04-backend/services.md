# Services

## email (`backend/services/email.js`)

Functions (target names):

- `sendAppointmentBooked({ clinic, owner, pet, appointment })`
- `sendAppointmentConfirmed(...)`
- `sendAppointmentCancelled(...)`
- `sendReminder(...)`
- `sendPasswordReset(...)`

All return promises; catch at call site; log failures.

## authPayload

Shape user (+ clinic) for `/me` and signin responses.

## slots (clinics)

`getClinicSlots` — MVP may return fixed intervals for open days; document algorithm in `06-api/clinics.md`.

## appointmentService (recommended extract)

- `book`
- `transitionStatus`
- `assertNoConflict`

Keep controllers thin.
