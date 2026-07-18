# Clinics API

## GET `/api/clinics`

**Auth:** public  
**200:** list of clinics (safe fields)

## GET `/api/clinics/:id`

**Auth:** public  
**404** if missing

## GET `/api/clinics/:id/slots`

**Auth:** public or owner  
**Query:** `?date=YYYY-MM-DD` (optional)  
**200:** `{ data: { slots: ["09:00","09:30", ...] } }`  

MVP algorithm: generate intervals during operating hours excluding already booked confirmed/pending slots.

## Profile update

See `profile.md` — `PUT /api/profile/clinic`
