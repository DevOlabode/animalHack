# Controllers

## Pattern

```js
async function bookAppointment(req, res) {
  try {
    // authorize already done
    // body already validated
    const result = await appointmentService.book(req.user, req.body);
    res.status(201).json({ data: result });
  } catch (err) {
    // map domain errors
  }
}
```

## Appointments controller — required behaviors

| Handler | Rules |
|---------|-------|
| `bookAppointment` | Set ownerId from session; vetId from clinic.userId; status pending; email clinic |
| `listOwnerAppointments` | Filter ownerId |
| `listClinicAppointments` | Filter clinic of vet; support `?status=` |
| `updateAppointmentStatus` | Enforce transition table; set cancellation fields; email owner |

## Pets

| Handler | Rules |
|---------|-------|
| create/list/update/delete | ownerId = session |
| get by id | owner OR authorized vet |

## Medical

| Handler | Rules |
|---------|-------|
| getTimeline | merge + sort |
| createDiagnosis/Prescription/Reminder | vet only; stamp clinicId/vetId |
| listOwnerReminders/Tasks | owner |
| updateTaskStatus | owner + ownership check |
| listClinicPatients / searchPatients | vet clinic scope |
| uploadDocument | owner |

## Auth

signup, signup/clinic, signin, logout, me, forgot, reset — see `06-api/auth.md`.
