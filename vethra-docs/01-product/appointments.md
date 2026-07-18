# Appointments

**Phase:** MVP (Hackathon)

## Objective

Owners book visits with a problem/reason; cancel with reason; clinics approve/decline and complete; calendar views by status.

## User stories


- As an owner, I book an appointment choosing pet, clinic, date, time, and reason.
- As an owner, I cancel a pending/confirmed appointment and must provide a cancellation reason.
- As a clinic, I receive email when booked; I see pet + reason; I accept or decline.
- As a clinic, I see appointments grouped by waiting approval / approved / declined / completed (calendar or status boards).
- As a clinic, I mark completed after the visit.


## Acceptance criteria


- [ ] Status machine: pending → confirmed | cancelled; confirmed → completed | cancelled; declined maps to cancelled or dedicated `declined` (see rules)
- [ ] Book requires future date/time
- [ ] Reason required (max 500)
- [ ] Cancel requires `cancellationReason`
- [ ] Owner cannot accept/decline
- [ ] Vet cannot book as owner unless also owner role (MVP: separate accounts)
- [ ] Double-booking prevention for same clinic+date+time (MVP soft or hard)
- [ ] Emails on book / confirm / cancel


## Business rules


### Status lifecycle

```
pending --confirm--> confirmed --complete--> completed
   |                    |
   +----cancel----------+----cancel----> cancelled
   +----decline---------> cancelled (or status=declined if added)
```

**MVP recommendation:** Keep enum `pending | confirmed | cancelled | completed`. Store decline vs owner-cancel in `cancellationReason` / `cancelledBy` fields (`owner` | `clinic`).

### Booking constraints

- Pet must belong to owner
- Clinic must exist
- `vetId` = clinic.userId in MVP
- No booking in the past
- One active pending/confirmed per pet+clinic+slot

### Cancellation

- Owner or clinic may cancel when status is pending or confirmed
- Reason required (min 3, max 500)


## Validation rules


Create: petId, clinicId, date, time, reason (required)  
Status patch: status enum + optional reason when cancelling/declining  


## Edge cases


- Slot taken → 409
- Cancel completed appointment → 400
- Vet declines → owner notified
- Timezone: store date as Date UTC; display in local; document assumption (clinic local / browser local) in MVP


## Permissions


| Action | Owner | Vet |
|--------|-------|-----|
| Book | ✓ own pets | ✗ |
| List own | ✓ | ✗ |
| List clinic | ✗ | ✓ own clinic |
| Confirm/Decline | ✗ | ✓ |
| Complete | ✗ | ✓ |
| Cancel | ✓ own | ✓ own clinic |


## Data model

`03-database/appointments.md`

## API

`06-api/appointments.md`

## UI requirements


- Owner appointments list + book form on clinic page
- Clinic appointments board/calendar filters: pending, confirmed, cancelled, completed
- Show pet name, owner, reason prominently on clinic cards


## Error states

400 validation, 403 forbidden, 404 not found, 409 conflict.

## Future considerations

Reschedule, waitlist, recurring, multi-vet calendars, deposits.


## Time zone policy (MVP)

- Store `date` as UTC midnight for the chosen calendar day **or** full ISO datetime — pick one approach in implementation and stay consistent.
- `time` is local clinic wall-clock string `HH:mm`.
- Document in UI: times shown are clinic local time (MVP assumption: single timezone deploy / browser local acceptable for hackathon if disclosed).

## Notification payload fields (minimum)

When emailing a new booking to the clinic, include:

- Owner name + email
- Pet name, species, breed
- Allergies (if any)
- Date + time
- Full reason text
- Link to `/clinic/appointments`

## Implementation checklist for agents

1. Add `cancellationReason` + `cancelledBy` to Appointment model if missing
2. Joi validate create + status
3. Conflict check on book
4. Wire emails soft-fail
5. Owner cancel modal with reason
6. Clinic board filters by status
7. Acceptance tests AT-04…AT-07

