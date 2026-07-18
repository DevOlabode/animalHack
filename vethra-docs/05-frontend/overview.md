# Frontend Overview

**Stack:** React 19 · Vite · React Router 7 · Axios · AuthContext

## Goals

- Role-aware navigation (owner vs vet)
- Clear booking UX with reason field
- Clinic calendar/status boards
- Responsive layouts via existing shells

## Key modules

| Path | Role |
|------|------|
| `src/context/AuthContext.jsx` | Session user, login/logout |
| `src/App.jsx` | Routes |
| `src/views/*` | Pages |
| `src/components/*` | Shared UI |
| `frontend/services/*` | API calls |

## State

See `STATE_MANAGEMENT.md`. MVP: Context + local component state. Avoid Redux.
