# Workflow: Book Appointment

```
Owner authenticated
  → GET /clinics
  → GET /clinics/:id
  → Select pet, date, time (slots), enter reason
  → POST /appointments
  → status=pending
  → Email clinic (pet + reason)
  → Owner sees appointment in list
```

## UI checklist

- [ ] Reason required before submit
- [ ] Cannot book without pet
- [ ] Success toast/banner
- [ ] Double-click does not create duplicates (disable button)
