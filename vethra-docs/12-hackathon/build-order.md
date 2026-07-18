# Build Order

Suggested sequence to avoid blocked UI:

1. **Auth + roles + shells** — sign in both personas
2. **Clinic signup + public clinic list/detail**
3. **Pets CRUD**
4. **Appointments book + lists + status transitions + cancel reason**
5. **Emails for booking lifecycle**
6. **Patient list + detail + timeline aggregation**
7. **Diagnosis + prescription**
8. **Reminders + tasks**
9. **Documents (URL or upload)**
10. **Search**
11. **Polish empty/loading/error + mobile**
12. **Seed + demo rehearsal**

Stretch only after 1–11 solid.
