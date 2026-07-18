# Database Decisions

| Decision | Why |
|----------|-----|
| MongoDB + Mongoose | Matches team velocity; flexible medical documents |
| User + Clinic split | Auth identity ≠ public clinic profile |
| Appointment denormalizes ownerId + vetId | Faster queries without joins |
| Age not stored | Derived from DOB; always correct |
| allergies as String MVP | Simple forms; arrays Phase 2 |
| Single vet user per clinic MVP | Avoid staff complexity during hackathon |
| cancellationReason on Appointment | Owner cancel + clinic decline audit |
| Separate Reminder vs TreatmentTask | Schedule/notify vs compliance checkbox |
| MedicalDocument stores URL | Swap storage providers without schema rewrite |
| No social Post in MVP schema | Prevent scope creep; add later cleanly |
