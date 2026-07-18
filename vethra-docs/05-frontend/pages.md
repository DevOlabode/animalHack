# Pages Specification

Each page: Purpose · Route · Role · Components · API · States · AC

---

## Landing / Home

| | |
|--|--|
| **Route** | `/` |
| **Role** | Public → role home |
| **Purpose** | Marketing for guests; dashboard for authed |
| **Components** | `NotLoggedInHome` / `OwnerLoggedInView` / `ClinicLoggedInView` |
| **API** | `/api/auth/me` (via AuthContext) |
| **Empty** | Owner with no pets → CTA add pet |
| **AC** | Correct home by role within 1 paint after auth resolves |

---

## Sign In

| | |
|--|--|
| **Route** | `/signin` |
| **API** | `POST /api/auth/signin` |
| **Fields** | email, password |
| **AC** | Errors shown; redirect `/` on success |

---

## Sign Up — Owner

| **Route** | `/signup` |
| **API** | `POST /api/auth/signup` |
| **Fields** | name, email, password |

---

## Sign Up — Clinic

| **Route** | `/signup/clinic` |
| **API** | `POST /api/auth/signup/clinic` |
| **Fields** | user + clinic profile fields |

---

## Forgot / Reset Password

Routes: `/forgot-password`, `/reset-password`  
APIs: forgot + reset endpoints.

---

## About

`/about` — public story of Vethra.

---

## Clinics List

| **Route** | `/clinics` |
| **API** | `GET /api/clinics` |
| **AC** | Cards with name, address, hours; link to detail |

---

## Clinic Detail

| **Route** | `/clinics/:id` |
| **API** | `GET /api/clinics/:id`, slots, `POST /api/appointments` |
| **AC** | Shows profile; booking form: pet select, date, time, **reason**; success feedback |

---

## Owner Appointments

| **Route** | `/appointments` |
| **Role** | pet_owner |
| **API** | list owner; patch cancel with reason |
| **AC** | Status badges; cancel modal requires reason |

---

## Clinic Appointments (Calendar)

| **Route** | `/clinic/appointments` |
| **Role** | vet |
| **API** | list clinic; patch status |
| **UI** | Filters/tabs: pending · confirmed · cancelled · completed (calendar view stretch) |
| **AC** | Card shows **pet name + reason**; Accept / Decline / Complete actions |

---

## Pets List / Form / Detail

| Routes | `/pets`, `/pets/new`, `/pets/:id`, `/pets/:id/edit` |
| APIs | pets CRUD + timeline |
| AC | Full pet fields; photo; timeline section on detail |

---

## Reminders (Owner)

`/reminders` — list reminders + treatment tasks; patch task status.

---

## Patients (Vet)

`/patients`, `/patients/:id` — list/search; patient detail with timeline + diagnosis/Rx/reminder forms.

---

## Profile

`/profile` — owner profile or clinic profile edit (role-specific).

---

## Future pages (do not build for MVP)

- Social feed
- Article editor
- Reviews UI
- In-app notification center
