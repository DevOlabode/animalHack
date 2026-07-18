# Social Feed (Pet Moments)

**Phase:** Future

## Objective

Owners post fun, beautiful moments with/about their pets (community engagement layer—not MVP).

## User stories


- As an owner, I post a photo/caption moment tied to a pet.
- As an owner, I browse a feed of moments (public or followers — TBD).


## Acceptance criteria

Not required for hackathon. Spec only for architecture readiness.

## Business rules


- Moderation required before scale
- No medical claims in social posts positioning
- Separate `Post` collection; do not overload MedicalDocument


## Validation rules

caption max; image required; petId must be owned.

## Edge cases

Private pets; report/block.

## Permissions

Owner create; public/friends read (policy TBD).

## Data model

Future: Post { ownerId, petId, imageUrl, caption, likesCount, createdAt }

## API

Future: /api/posts

## UI requirements

Feed page; compose modal — out of MVP navigation.

## Error states

n/a MVP

## Future considerations

This feature itself is Future; later: hashtags, following, clinic resharing.
