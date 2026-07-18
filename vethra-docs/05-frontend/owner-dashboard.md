# Owner Dashboard UI Spec

**View:** `OwnerLoggedInView` · **Route:** `/` (owner)

## Purpose

At-a-glance care hub after login.

## Content blocks (MVP)

1. Greeting + primary CTA: Book appointment → `/clinics`
2. Upcoming appointments (next 3) — status + clinic + reason snippet
3. Active reminders / tasks due soon
4. Pets strip — photo + name; link to pet detail
5. Optional: recent timeline events across pets (stretch)

## States

| State | UI |
|-------|----|
| Loading | Skeleton/spinner in shell |
| No pets | EmptyState “Add your first pet” → `/pets/new` |
| No appointments | CTA browse clinics |
| Error | Retry banner |

## API

- Pets list
- Owner appointments
- Reminders + tasks

## Acceptance

- [ ] Owner with data sees appointments without navigating away
- [ ] Reason visible on upcoming cards (truncated OK)
- [ ] Works at 375px width
