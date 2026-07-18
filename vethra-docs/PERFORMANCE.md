# Performance

## MVP budgets

- API list endpoints < 500ms on Atlas shared (excl. cold start)
- Avoid N+1: use `populate` thoughtfully or aggregate timeline in one service function
- Indexes from `03-database/indexes.md`

## Frontend

- Don’t fetch entire app data on layout
- Cancel effects on unmount
- Images: reasonable resolutions

## Later

- Pagination
- HTTP caching for public clinics
- Reminder cron worker isolated from web process
