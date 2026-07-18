# API Style Guide

## URL design

- Nouns plural: `/api/pets`
- Actions as subresources when needed: `/api/appointments/:id/status`
- Avoid verbs in paths: no `/api/createPet`

## HTTP verbs

| Verb | Use |
|------|-----|
| GET | Read |
| POST | Create |
| PUT | Replace/update profile-like resources |
| PATCH | Partial status updates |
| DELETE | Remove |

## JSON

- camelCase keys
- No password fields ever
- Populate carefully — avoid leaking other users’ emails beyond need

## Versioning

MVP: unversioned `/api`. Phase 2: `/api/v1` if breaking.
