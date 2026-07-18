# Patient Search

**Phase:** MVP (Hackathon)

## Objective

Vets quickly find patients by pet name, owner name, or microchip.

## User stories

- As a vet, I search and open a patient detail page.

## Acceptance criteria

- [ ] `GET /api/medical/search/patients?q=` returns matches for clinic context.

## Business rules

Scope results to pets with appointments at this clinic (MVP) to avoid leaking unrelated owners.

## Validation rules

q min 1–2 chars.

## Edge cases

No results empty state. Special characters escaped for regex.

## Permissions

Vet only.

## Data model

Pet + User fields.

## API

`06-api/medical.md`, `SEARCH.md`

## UI requirements

Search bar on patients page.

## Error states

401/403.

## Future considerations

Full-text indexes; owner clinic search filters.
