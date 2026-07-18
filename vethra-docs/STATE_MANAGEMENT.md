# State Management

## MVP

| State | Where |
|-------|-------|
| Auth user | `AuthContext` |
| Server lists | `useState` + `useEffect` in views |
| Form fields | local component state |
| Modals open | local state |

## Do not introduce for MVP

Redux, MobX, complex global stores.

## Phase 2

- TanStack Query for server cache/invalidation (especially appointments)
- Zustand for UI ephemeral state (sidebar, theme)
