# Code Style

## JavaScript

- CommonJS on backend (`require`/`module.exports`) matching current repo
- ESM on frontend (`import`/`export`)
- Prefer `async/await` over raw promises chains
- No unused variables; ESLint clean on frontend

## Naming

See `02-system-design/naming-conventions.md`.

## Files

- One primary export concept per model file
- Controllers export named functions
- Avoid god-files > ~400 lines — split services

## Comments

Only for non-obvious business rules (e.g. status transitions). No narrating comments.
