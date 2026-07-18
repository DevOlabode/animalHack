# Prescriptions

**Phase:** MVP (Hackathon)

## Objective

Vets prescribe medications; owners view active and past Rx.

## User stories


- As a vet, I create Rx with medicationName, dosage, frequency, duration, instructions.
- As an owner, I see active prescriptions on dashboard/pet page.


## Acceptance criteria

- [ ] Create vet-only; list by pet; `isActive` flag; timeline entry.

## Business rules

Owners cannot edit Rx. Deactivate via `isActive=false` (Phase 2 endpoint or MVP manual).

## Validation rules

medicationName, dosage, frequency, duration required.

## Edge cases

Multiple active Rx allowed.

## Permissions

Create: vet. Read: owner + vet.

## Data model

`03-database/prescriptions.md`

## API

`06-api/medical.md`

## UI requirements

Rx form; Active Rx list for owner.

## Error states

403/404/400.

## Future considerations

Pharmacy integrations, refill requests.
