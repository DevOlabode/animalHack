# API Examples (Copy-Paste)

## Book appointment

### Request

```http
POST /api/appointments HTTP/1.1
Content-Type: application/json
Cookie: connect.sid=...

{
  "petId": "665f1c2e8b3a4d0012ab0001",
  "clinicId": "665f1c2e8b3a4d0012ab00c1",
  "date": "2026-08-12",
  "time": "10:30",
  "reason": "Limping on the right hind leg for two days; whimpering when jumping on the couch."
}
```

### Response 201

```json
{
  "data": {
    "_id": "665f1c2e8b3a4d0012ab0a01",
    "petId": "665f1c2e8b3a4d0012ab0001",
    "ownerId": "665f1c2e8b3a4d0012ab0u01",
    "clinicId": "665f1c2e8b3a4d0012ab00c1",
    "vetId": "665f1c2e8b3a4d0012ab0v01",
    "date": "2026-08-12T00:00:00.000Z",
    "time": "10:30",
    "reason": "Limping on the right hind leg for two days; whimpering when jumping on the couch.",
    "status": "pending",
    "createdAt": "2026-07-17T18:00:00.000Z",
    "updatedAt": "2026-07-17T18:00:00.000Z"
  }
}
```

### Response 409

```json
{
  "error": "This time slot is no longer available",
  "code": "APPOINTMENT_CONFLICT"
}
```

## Confirm appointment

```http
PATCH /api/appointments/665f1c2e8b3a4d0012ab0a01/status
Content-Type: application/json

{ "status": "confirmed" }
```

## Decline / cancel (clinic)

```json
{
  "status": "cancelled",
  "cancellationReason": "Emergency surgery block — please rebook Thursday"
}
```

Server sets `cancelledBy: "clinic"`.

## Owner cancel

Same body; server sets `cancelledBy: "owner"` after verifying ownership.

## Create diagnosis

```json
{
  "petId": "665f1c2e8b3a4d0012ab0001",
  "appointmentId": "665f1c2e8b3a4d0012ab0a01",
  "diagnosis": "Suspected soft tissue sprain (right hind)",
  "clinicalNotes": "Mild swelling, pain on extension. No fracture suspected on exam.",
  "treatmentPlan": "Rest 7 days, anti-inflammatory course, recheck if worsens"
}
```

## Create prescription

```json
{
  "petId": "665f1c2e8b3a4d0012ab0001",
  "appointmentId": "665f1c2e8b3a4d0012ab0a01",
  "medicationName": "Carprofen",
  "dosage": "75mg",
  "frequency": "Once daily with food",
  "duration": "5 days",
  "instructions": "Stop and call clinic if vomiting or black stool"
}
```

## Timeline item shape

```json
{
  "data": [
    {
      "type": "diagnosis",
      "date": "2026-08-12T16:00:00.000Z",
      "title": "Suspected soft tissue sprain (right hind)",
      "summary": "Rest 7 days, anti-inflammatory course…",
      "refId": "..."
    },
    {
      "type": "appointment",
      "date": "2026-08-12T00:00:00.000Z",
      "title": "Appointment confirmed",
      "summary": "10:30 — Limping on the right hind leg…",
      "refId": "..."
    }
  ]
}
```
