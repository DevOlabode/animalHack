# User Personas

## Persona 1 — Maya (Pet Owner)

- **Age:** 28
- **Pets:** 2 dogs
- **Goals:** Book quickly, keep records, not miss meds
- **Frustrations:** Phone booking, lost paperwork, no shared history
- **MVP needs:** Sign up, pets, browse clinics, book with reason, cancel with reason, see reminders/tasks

## Persona 2 — Dr. Noah (Clinic Vet / Solo practitioner)

- **Role:** Primary vet at a small clinic (or private practice)
- **Goals:** Know why the animal is coming; keep organized schedule; write notes once
- **Frustrations:** Incomplete intake; no-shows; paper charts
- **MVP needs:** Dashboard/calendar, accept/decline, patient timeline, diagnosis, Rx, reminders

## Persona 3 — Priya (Clinic Admin) — Phase 2

- Manages multiple vets, hours, and front-desk load
- Needs staff accounts, analytics, richer profile (reviews, team photos)

## Persona roles in software (MVP)

| Role string | Who |
|-------------|-----|
| `pet_owner` / `owner` | Maya |
| `vet` | Dr. Noah (clinic account) |
| `admin` | Platform admin (reserved; not MVP UI) |

> Code currently accepts `pet_owner` and `owner` as owner aliases. Prefer `pet_owner` in new code; treat `owner` as legacy alias.
