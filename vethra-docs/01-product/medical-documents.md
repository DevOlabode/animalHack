# Medical Documents

**Phase:** MVP (Hackathon)

## Objective

Owners upload vaccination certificates, labs, imaging, referrals (PDF/JPG/PNG).

## User stories

- As an owner, I upload a document to my pet and see it on the timeline.

## Acceptance criteria

- [ ] Create + list by pet; fileType enum; documentType enum; fileUrl stored.

## Business rules

Max size 5MB MVP; MIME allowlist; virus scan Future.

## Validation rules

title, documentType, fileType, fileUrl/petId required.

## Edge cases

Unsupported type → 400. Vet read-only on documents for patients.

## Permissions

Owner upload/list own; vet list for accessible pets.

## Data model

`03-database/medical-documents.md`

## API

`06-api/medical.md`

## UI requirements

Upload control on pet detail; document list.

## Error states

413 payload too large; 400 bad type.

## Future considerations

Direct Cloudinary signed uploads; vet uploads too.
