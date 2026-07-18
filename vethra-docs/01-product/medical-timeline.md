# Medical Timeline

**Phase:** MVP (Hackathon)

## Objective

Chronological unified history per pet for owners and authorized vets.

## User stories


- As an owner or vet, I open a pet and see diagnoses, prescriptions, appointments, reminders, documents, and treatments in time order.


## Acceptance criteria


- [ ] `GET /api/medical/pets/:petId/timeline` returns merged, sorted items
- [ ] Each item has type, date, summary, references
- [ ] Newest-first or oldest-first consistently (document: newest-first default)


## Business rules

Only owner of pet or vet with access (clinic that treated / has appointment) can read.

## Validation rules

petId ObjectId.

## Edge cases

Empty timeline → helpful empty state. Large history → pagination Phase 2.

## Permissions

Read: owner or authorized vet. Write: via specific create endpoints, not timeline itself.

## Data model

Aggregates Appointment, Diagnosis, Prescription, Reminder, TreatmentTask, MedicalDocument.

## API

`06-api/medical.md`

## UI requirements

Timeline component on Pet detail (owner) and Patient detail (vet).

## Error states

403/404.

## Future considerations

Filters by type, export PDF summary.
