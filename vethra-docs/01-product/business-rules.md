# Cross-Cutting Business Rules

1. **Roles are exclusive for MVP UX** — an account is owner or vet, not both (separate emails if needed).
2. **Reason is mandatory** on create appointment.
3. **Cancellation/decline requires reason** (min 3 chars).
4. **Owners never mutate clinical records** (diagnosis, Rx).
5. **Vets never mutate another clinic’s records**.
6. **Pet access for vets** requires clinical relationship (appointment with clinic) unless admin.
7. **Completed appointments are immutable** for status (no reopen in MVP).
8. **Email failures do not roll back** successful bookings.
9. **Demo seed data** must be idempotent or clearly resettable.
10. **Future features** (feed, articles, reviews) must not block MVP routes or schemas beyond additive fields.
