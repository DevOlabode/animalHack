# API Overview

**Base URL:** `VITE_API_URL` + `/api`  
**Format:** JSON  
**Auth:** Session cookie  

## Conventions

- Success: `{ "data": ... }` (standardize toward this)
- Error: `{ "error", "code", "details?" }`
- Dates: ISO 8601
- ObjectIds: 24-char hex strings

## Endpoint index

| Area | Doc |
|------|-----|
| Auth | [auth.md](./auth.md) |
| Pets | [pets.md](./pets.md) |
| Clinics | [clinics.md](./clinics.md) |
| Appointments | [appointments.md](./appointments.md) |
| Medical | [medical.md](./medical.md) |
| Profile | [profile.md](./profile.md) |
