# Design System

**Phase:** MVP — practical clarity over novelty. Preserve existing Vethra visual language in the codebase when present.

## Principles

1. One job per screen region
2. Reason for visit is visually primary on clinic appointment cards
3. Status must be scannable (color + label, not color alone)
4. Empty states teach the next action
5. Mobile-usable forms (booking, pets)

## Layout

- Max content width ~1120–1200px for app shells
- Page header: title + primary action
- Cards only when they group an interactive unit (appointment, pet)

## Status colors (semantic)

| Status | Meaning |
|--------|---------|
| pending | Waiting approval — amber/warn |
| confirmed | Approved — green/info success |
| cancelled | Ended without visit — neutral/muted |
| completed | Done — strong success / blue-gray |
| in_progress / missed | Task states — distinct from appointment |

Exact hex: define CSS variables in `color-system.md`.
