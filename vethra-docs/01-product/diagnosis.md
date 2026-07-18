# Diagnosis

**Phase:** MVP (Hackathon)

## Objective

Vets record diagnosis, clinical notes, and treatment plan linked to pet (and optionally appointment).

## User stories

- As a vet, after/during a visit I add a diagnosis that appears on the timeline.

## Acceptance criteria

- [ ] Vet-only create; appears on timeline; owner can read.

## Business rules

vetId = current user; clinicId = their clinic; owners cannot edit/delete (MVP).

## Validation rules

petId, diagnosis required; clinicalNotes, treatmentPlan optional; appointmentId optional.

## Edge cases

Diagnosis without appointment allowed (walk-in historical entry).

## Permissions

Create: vet. Read: owner + authorized vet. Update/Delete: Phase 2 with audit.

## Data model

`03-database/diagnoses.md`

## API

`06-api/medical.md`

## UI requirements

Diagnosis form on patient/appointment detail.

## Error states

403 if not vet; 404 pet.

## Future considerations

ICD-like codes, attachments, amendments with history.
