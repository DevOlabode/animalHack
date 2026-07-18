# Security Overview

## Controls (MVP)

| Control | Implementation |
|---------|----------------|
| Password hashing | bcrypt (cost 10) |
| Session auth | httpOnly cookie session, secure in prod |
| RBAC | `isPetOwner` / `isVet` |
| Ownership | pet.ownerId, clinic.userId checks |
| Input validation | Joi |
| CORS | allow `CLIENT_URL` + credentials |
| Helmet | recommended |
| Uploads | type/size allowlist |
| Secrets | env only |

## Threats to respect

- IDOR on `/pets/:id`, appointments, tasks
- Role elevation via body.role
- Session fixation — regenerate on login
- Regex injection in search
- XSS — React escapes; avoid `dangerouslySetInnerHTML`
- Email enumeration on forgot — constant response
