# File Storage

## MVP

- Store `photoUrl` / `fileUrl` strings on models
- Accept HTTPS URLs or upload via Multer → local/Cloudinary
- Allowed: PDF, JPG, PNG
- Max size: 5MB

## Validation

- MIME + extension allowlist
- Reject executable types
- Randomize stored filenames if local disk

## Target

Cloudinary for images; same for document transforms optional.

## Security

- No public listing of upload directory
- Auth required to upload
- Vets read URLs only for accessible patients
