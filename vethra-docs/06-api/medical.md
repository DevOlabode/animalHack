# Medical API

Base: `/api/medical`

## GET `/pets/:petId/timeline`

**Auth:** owner of pet OR vet with access  
**200:** `{ data: TimelineItem[] }` sorted by date desc  

TimelineItem:

```json
{
  "type": "appointment|diagnosis|prescription|reminder|task|document",
  "date": "ISO",
  "title": "...",
  "summary": "...",
  "refId": "..."
}
```

## POST `/diagnoses` (vet)

Body: `{ petId, appointmentId?, diagnosis, clinicalNotes?, treatmentPlan? }`

## POST `/prescriptions` (vet)

Body: `{ petId, appointmentId?, diagnosisId?, medicationName, dosage, frequency, duration, instructions? }`

## GET `/pets/:petId/prescriptions`

Owner or vet.

## POST `/reminders` (vet)

Body: `{ petId, type, title, message?, dueDate, prescriptionId?, appointmentId? }`  
Server sets ownerId from pet.

## GET `/reminders` (owner)

## GET `/tasks` (owner)

## PATCH `/tasks/:id/status` (owner)

Body: `{ status: "completed"|"missed"|"in_progress" }`

## GET `/pets/:petId/documents`

## POST `/pets/:petId/documents` (owner)

Body: `{ title, documentType, fileType, fileUrl }`

## GET `/patients` (vet)

Pets with appointments at this clinic.

## GET `/search/patients?q=` (vet)

Search name / owner name / microchip within clinic patients.
