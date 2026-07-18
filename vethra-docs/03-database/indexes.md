# Indexes

## Required MVP

| Collection | Index |
|------------|-------|
| users | unique email |
| clinics | unique userId |
| pets | ownerId |
| appointments | clinicId + date + status |
| appointments | ownerId + date |
| diagnoses | petId + createdAt |
| prescriptions | petId + isActive |
| reminders | ownerId + dueDate |
| medicaldocuments | petId |

## Search

For patient search, consider:

```
pets: { name: 'text', microchipNumber: 1 }
users: { name: 'text' }
```

Or application-level case-insensitive regex with escaped input (current approach OK for hackathon).
