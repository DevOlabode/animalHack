# Treatment Tracker

**Phase:** MVP (Hackathon)

## Objective

Owners update care task status so clinics can monitor compliance.

## User stories


- As an owner, I mark tasks completed | missed | in_progress.
- As a vet, I can see task status on patient view (read).


## Acceptance criteria

- [ ] List tasks for owner; PATCH status; statuses enum enforced.

## Business rules

Tasks may link reminderId/prescriptionId. Owners only update own tasks.

## Validation rules

status enum only on patch.

## Edge cases

Task with past due still patchable.

## Permissions

Owner update status; vet read via patient context (Phase 2 endpoint if missing).

## Data model

`03-database/treatment-tasks.md`

## API

`06-api/medical.md`

## UI requirements

Tasks on Reminders/Dashboard with status controls.

## Error states

404 task; 403 not owner.

## Future considerations

Photo proof of completion; streak metrics.
