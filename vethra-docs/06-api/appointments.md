# Appointments API

## POST `/api/appointments`

**Auth:** pet_owner  
**Body:**

```json
{
  "petId": "...",
  "clinicId": "...",
  "date": "2026-08-01",
  "time": "10:30",
  "reason": "Limping on right hind leg for 2 days"
}
```

**Server sets:** `ownerId`, `vetId`, `status=pending`  
**201:** appointment (populated pet/clinic useful)  
**Emails:** clinic notification with pet + reason  
**Errors:** 400 validation; 403 pet not owned; 404 clinic; 409 `APPOINTMENT_CONFLICT`

## GET `/api/appointments/owner`

**Auth:** pet_owner  
**200:** owner's appointments (populate pet, clinic)

## GET `/api/appointments/clinic`

**Auth:** vet  
**Query:** `?status=pending|confirmed|cancelled|completed`  
**200:** clinic appointments (populate pet, owner) — **include reason**

## PATCH `/api/appointments/:id/status`

**Auth:** owner or vet (action-dependent)

**Body examples:**

```json
{ "status": "confirmed" }
```

```json
{ "status": "cancelled", "cancellationReason": "Pet feeling better" }
```

```json
{ "status": "completed" }
```

**Rules:**

| Actor | Allowed transitions |
|-------|---------------------|
| Vet | pending→confirmed; pending→cancelled (decline); confirmed→completed; confirmed→cancelled |
| Owner | pending|confirmed → cancelled (reason required) |

**Emails:** confirm/cancel to owner (and clinic if owner cancels)  
**Errors:** 400 illegal transition `INVALID_STATUS_TRANSITION`
