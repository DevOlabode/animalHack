# Scope

## In scope — Hackathon MVP

- Auth: pet owner + clinic (vet) roles
- Pet CRUD with photos (URL) and clinical basics
- Public clinic browse + clinic profile
- Appointment book / cancel-with-reason / accept / decline / complete
- Clinic calendar-style appointment lists by status
- Medical timeline (appointments, diagnoses, prescriptions, reminders, tasks, documents)
- Diagnosis + prescription create (vet)
- Reminders + treatment task status (owner)
- Document metadata/upload path
- Patient search (vet)
- Email notifications for booking lifecycle + reminders
- Responsive UI

## Explicitly out of scope — Hackathon

| Feature | Deferred to |
|---------|-------------|
| Social pet moments feed | Future |
| Clinic articles / blog | Future |
| Star reviews & ratings | Phase 2 |
| Geo/map “near me” with lat/lng | Phase 2 |
| Multi-vet staff accounts per clinic | Phase 2 |
| Real-time in-app notification center | Phase 2 |
| Payments / subscriptions billing | Phase 3 |
| Telemedicine / chat | Future |
| Native iOS/Android | Future |
| AI diagnosis | Future |

## Mind-map mapping

| Mind-map idea | Spec home | Phase |
|---------------|-----------|-------|
| Post fun pet moments | `01-product/social-feed.md` | Future |
| Rich clinic pages (values, reviews, doctors) | `01-product/clinics.md` | MVP basic / Phase 2 rich |
| Register many pets | `01-product/pet-profiles.md` | MVP |
| Book with reason | `01-product/appointments.md` | MVP |
| Cancel with reason | `01-product/appointments.md` | MVP |
| Clinic notifications | `EMAILS.md`, `NOTIFICATIONS.md` | MVP email |
| Calendar statuses | `01-product/appointments.md` | MVP |
| Post articles | `01-product/articles.md` | Future |
