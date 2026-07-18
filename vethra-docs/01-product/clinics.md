# Clinics & Discovery

**Phase:** MVP (Hackathon)

Rich profile (reviews, team, values, geo): **Phase:** Phase 2 (Post-hackathon)

## Objective

Owners discover clinics/private vets and view everything needed to decide and book. Clinics maintain a public profile.

## User stories


- As an owner, I can browse a list of clinics.
- As an owner, I can open a clinic page (name, description, address, phone, email, hours) and book.
- As a clinic, I can edit my profile.
- As an owner (Phase 2), I can see reviews, values, and vet doctors with photos.


## Acceptance criteria


### MVP
- [ ] Public `GET /api/clinics` and `GET /api/clinics/:id`
- [ ] Slots endpoint for booking UI
- [ ] Clinic can update profile when authenticated as vet
- [ ] Clinic detail page has Book CTA

### Phase 2
- [ ] Geo/location fields + “near me”
- [ ] Reviews aggregate
- [ ] Team members (vets) with photos
- [ ] Structured hours JSON
- [ ] Services & values fields


## Business rules


- One Clinic per vet user in MVP (`userId` unique)
- Public read for clinic list/detail
- Only owning vet edits clinic


## Validation rules

name, address, phone, email, operatingHours required; description optional max 2000.

## Edge cases

Empty clinic directory → seed data for demo. Invalid clinic id → 404.

## Permissions

Public read. Vet write own. Owners cannot edit clinics.

## Data model

`03-database/clinics.md`

## API

`06-api/clinics.md`

## UI requirements

Clinics list, Clinic detail, Clinic profile edit (vet settings).

## Error states

404 clinic not found.

## Future considerations

Articles on clinic page; verified badges; marketplace ranking.
