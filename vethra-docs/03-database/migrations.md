# Migrations

MVP uses Mongoose schema evolution (no formal migration tool).

## Process

1. Update model file
2. Deploy backend
3. Optionally run a one-off script for backfills
4. Document breaking changes here

## Planned additive fields (non-breaking)

- Appointment.cancellationReason
- Appointment.cancelledBy
- Clinic geo/team/reviews (Phase 2)

Never rename fields without a backfill script.
