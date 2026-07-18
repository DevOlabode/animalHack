# Naming Conventions

| Kind | Convention | Example |
|------|------------|---------|
| Mongo fields | camelCase | `ownerId`, `photoUrl` |
| Collections | Mongoose default pluralization | `pets` |
| REST paths | plural nouns | `/api/appointments` |
| Status enums | snake or lower words | `in_progress`, `pending` |
| React components | PascalCase | `AppointmentCard` |
| Hooks | useCamel | `useAuth` |
| Env vars | SCREAMING_SNAKE | `MONGODB_URI` |
| Error codes | SCREAMING_SNAKE | `APPOINTMENT_CONFLICT` |

Roles in API responses: prefer `pet_owner` | `vet` | `admin`.
