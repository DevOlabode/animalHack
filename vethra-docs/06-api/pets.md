# Pets API

**Auth:** pet owner (unless noted)

## GET `/api/pets`

List pets for session owner.  
**200:** `{ data: Pet[] }` (include computed `age`)

## POST `/api/pets`

**Body:** pet fields (see DB + Joi)  
**201:** created pet

## GET `/api/pets/:id`

Owner or authorized vet.  
**404** `PET_NOT_FOUND` · **403** `FORBIDDEN`

## PUT `/api/pets/:id`

Owner only. Partial/full update per implementation — prefer full replace of editable fields.

## DELETE `/api/pets/:id`

Owner only.  
**400** if blocking appointments exist (`PET_HAS_APPOINTMENTS`)
