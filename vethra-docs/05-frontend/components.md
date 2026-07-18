# Frontend Components

See also `COMPONENT_GUIDE.md`.

## Shells / layout

| Component | Use |
|-----------|-----|
| `PublicShell` | Marketing/public |
| `AppShell` | Authenticated chrome |
| `AuthLayout` | Sign in/up |
| `NavBar` | Role links |
| `Footer` | Public footer |
| `PageHeader` | Title + actions |
| `BrandLogo` | Brand mark |

## Guards

`RequireAuth`, `RequirePetOwner`, `RequireVet`

## Domain (build/extend)

| Component | Props (key) | Notes |
|-----------|-------------|-------|
| `AppointmentCard` | appointment, pet, clinic, onAccept, onDecline, onComplete, onCancel | Show reason prominently |
| `PetCard` | pet | Photo, name, species |
| `ClinicCard` | clinic | Address, hours |
| `TimelineList` | items[] | Type icon + date + summary |
| `StatusBadge` | status | pending/confirmed/cancelled/completed |
| `EmptyState` | title, action | Existing |
| `StatCard` | label, value | Dashboard |
| `ConfirmModal` | title, requireReason? | Cancel/decline |
| `LoadingSpinner` | | Full page / inline |

## Forms

Prefer controlled inputs; disable submit while pending; map `details[]` errors to fields.
