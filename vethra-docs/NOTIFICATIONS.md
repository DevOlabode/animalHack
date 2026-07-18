# Notifications Architecture

## MVP

Email only (see `EMAILS.md`).

## Phase 2 — in-app

Collection `notifications`:

```
{ userId, type, title, body, href, readAt, meta, createdAt }
```

Emit on same events as email. UI: bell + list.

## Channels matrix

| Event | Email MVP | In-app P2 | SMS Future |
|-------|-----------|-----------|------------|
| Booked | clinic | clinic | optional |
| Confirmed | owner | owner | optional |
| Cancelled | both | both | optional |
| Reminder due | owner | owner | optional |
