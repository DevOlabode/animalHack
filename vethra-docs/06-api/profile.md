# Profile API

## PUT `/api/profile`

**Auth:** any user  
**Body:** `{ name }` (and safe fields only — not role, not password here)  
Password change: Phase 2 or separate endpoint.

## PUT `/api/profile/clinic`

**Auth:** vet  
**Body:** clinic editable fields  
**403** if no clinic for user
