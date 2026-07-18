# Search

## Patient search (MVP)

`GET /api/medical/search/patients?q=`

Fields: pet.name, user.name (owner), pet.microchipNumber  
Scope: pets related to vet’s clinic via appointments  
Implementation: escaped case-insensitive regex OR text index

## Clinic search (stretch / Phase 2)

Filter `GET /api/clinics?q=` by name/address; later geo `$near`.

## Rules

- Min query length 2
- Limit results (e.g. 20)
- Never return pets from unrelated clinics
