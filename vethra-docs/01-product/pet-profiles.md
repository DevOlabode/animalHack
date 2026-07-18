# Pet Profiles

**Phase:** MVP (Hackathon)

## Objective

Owners register and manage unlimited pets with identity, clinical basics, photo, and emergency contact.

## User stories


- As an owner, I can add a pet with name, species, breed, DOB, weight, sex, allergies, conditions, microchip, photo, emergency contact.
- As an owner, I can edit or delete my pet.
- As an owner, I can open a pet detail page with timeline entry points.
- As a vet with an appointment for that pet, I can view the pet profile (read-only for owner fields).


## Acceptance criteria


- [ ] CRUD for own pets only
- [ ] Age derived from DOB (not stored)
- [ ] List pets on owner dashboard / pets page
- [ ] Photo URL stored (upload pipeline per FILE_STORAGE.md)
- [ ] Delete removes pet only if no hard FK constraints block; define cascade policy (MVP: prevent delete if future confirmed appointments, or soft-block with message)


## Business rules


- `ownerId` always = authenticated owner
- Weight ≥ 0
- Sex enum: male | female | unknown
- Vets cannot edit owner-owned identity fields


## Validation rules


Required: name, species, breed, dateOfBirth, weight, sex, emergencyContact  
Optional: microchipNumber, allergies, medicalConditions, photoUrl  
DOB cannot be in the future


## Edge cases


- Owner with 0 pets → empty state CTA “Add your first pet”
- Very long allergy text → max length 2000
- Delete pet with active appointments → 400 with reason


## Permissions

Owner: full CRUD on own pets. Vet: read pets they have clinical relationship with (via appointment/patient list).

## Data model

`03-database/pets.md`

## API

`06-api/pets.md`

## UI requirements

Pets list, Pet form (new/edit), Pet detail. Photo preview. Responsive forms.

## Error states

404 if pet not found or not owned. 403 if wrong role.

## Future considerations

Multiple photos, insurance ID, co-owners, QR medical passport.
