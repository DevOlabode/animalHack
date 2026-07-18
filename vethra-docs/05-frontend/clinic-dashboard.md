# Clinic Dashboard UI Spec

**View:** `ClinicLoggedInView` · **Route:** `/` (vet)

## Purpose

Vet home: what needs action today.

## Content blocks (MVP)

1. **Pending requests** count + list (pet, time, **reason**, Accept/Decline)
2. **Today’s confirmed** appointments
3. Shortcuts: Appointments board, Patients, Edit clinic profile
4. Optional stats: pending count, completed this week (stretch)

## Critical UX rule

On pending cards, **reason is never hidden behind a menu**. Clinics must see what they are about to work on.

## API

`GET /api/appointments/clinic?status=pending` and `status=confirmed` (or one call filtered client-side).

## Acceptance

- [ ] Accept/Decline from dashboard works without page reload errors
- [ ] Decline requires reason modal
- [ ] Empty pending state explains “No requests right now”
