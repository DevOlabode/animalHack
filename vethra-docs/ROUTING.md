# Routing

## Public

| Path | View |
|------|------|
| `/` | Home switcher |
| `/about` | About |
| `/signin` | Sign in |
| `/signup` | Owner signup |
| `/signup/clinic` | Clinic signup |
| `/forgot-password` | Forgot |
| `/reset-password` | Reset |
| `/clinics` | List |
| `/clinics/:id` | Detail + book |

## Owner

| Path | View |
|------|------|
| `/pets` | List |
| `/pets/new` | Create |
| `/pets/:id` | Detail + timeline |
| `/pets/:id/edit` | Edit |
| `/appointments` | Owner appointments |
| `/reminders` | Reminders + tasks |
| `/profile` | Profile |

## Vet

| Path | View |
|------|------|
| `/clinic/appointments` | Calendar/board |
| `/patients` | Patients |
| `/patients/:id` | Patient detail |
| `/profile` | Clinic profile edit |

## Future (do not add to App.jsx yet)

`/feed`, `/articles`, `/articles/:slug`, `/notifications`
