# Notifications

**Phase:** MVP (Hackathon) (email). In-app center: **Phase:** Phase 2 (Post-hackathon)

## Objective

Notify clinics and owners of booking and care events.

## User stories


- As a clinic, I get an email when an appointment is booked (with pet + reason).
- As an owner, I get emails on confirm/cancel and for reminders.


## Acceptance criteria

- [ ] Emails defined in EMAILS.md fire on events; failures logged, request still succeeds.

## Business rules

Email is best-effort; do not fail booking if mail provider down (log error).

## Validation rules

n/a

## Edge cases

Invalid owner email → log; still save appointment.

## Permissions

System-triggered.

## Data model

Reminder.emailSent; future Notification collection.

## API

Internal service; see NOTIFICATIONS.md

## UI requirements

MVP: none (email only). Phase 2: bell icon.

## Error states

Silent fail + log.

## Future considerations

In-app + push + SMS.
