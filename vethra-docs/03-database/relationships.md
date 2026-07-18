# Relationships

```
User (pet_owner) 1──* Pet
User (vet) 1──1 Clinic
Clinic 1──* Appointment
Pet 1──* Appointment
Pet 1──* Diagnosis
Pet 1──* Prescription
Pet 1──* Reminder
Pet 1──* TreatmentTask
Pet 1──* MedicalDocument
Appointment *──? Diagnosis
Diagnosis *──* Prescription (via diagnosisId)
```

## Ownership rules

- Pet.ownerId must match session user for owner mutations
- Clinic.userId must match session vet for clinic mutations
- Appointment.vetId should equal Clinic.userId in MVP
