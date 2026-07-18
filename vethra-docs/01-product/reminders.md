# Reminders

**Phase:** MVP (Hackathon)

## Objective

Vets schedule medication, vaccination, follow-up, and care reminders; owners get emails.

## User stories


- As a vet, I create a reminder with type, title, message, dueDate.
- As an owner, I see reminders and receive email when due (or on create — document policy).


## Acceptance criteria


- [ ] Types: medication | vaccination | follow_up | care_instruction
- [ ] Owner list endpoint
- [ ] emailSent flag updated when sent


## Business rules

MVP: send email on create and/or via cron near dueDate. Document chosen approach in EMAILS.md.

## Validation rules

type, title, dueDate, petId required.

## Edge cases

Past dueDate allowed for backfill; still list as overdue.

## Permissions

Create: vet. Read: owner (own), vet (clinic).

## Data model

`03-database/reminders.md`

## API

`06-api/medical.md`

## UI requirements

Reminders page (owner); create form (vet).

## Error states

400/403.

## Future considerations

SMS/push; owner-created reminders; RRULE recurrence.
