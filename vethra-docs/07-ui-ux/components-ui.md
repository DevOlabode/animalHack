# UI Component Patterns

## Buttons

| Variant | Use |
|---------|-----|
| primary | Main CTA (Book, Save, Accept) |
| secondary | Alternate |
| danger | Cancel appointment, Delete |
| ghost | Tertiary |

States: default, hover, active, disabled, loading (spinner + disabled).

## Forms

- Label above input
- Required indicator
- Helper text for reason field: “Describe what’s wrong so the clinic can prepare”
- Inline errors under fields

## Tables vs cards

- Desktop clinic day view may use table
- Mobile: stacked `AppointmentCard`s

## Modals

Cancel/Decline: textarea for reason required; Confirm disabled until min length.
