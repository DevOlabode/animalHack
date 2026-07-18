# Email Templates

Provider: Nodemailer / Brevo (`backend/services/email.js`).

## Principles

- Plain text + simple HTML
- Include pet name, clinic name, date/time, reason when relevant
- CTA link to `CLIENT_URL` path
- Fail soft (log, don’t fail HTTP) except password reset may surface send failure

## Templates

### 1. Appointment booked (to clinic)

**Subject:** New appointment request — {petName}  
**Body:** Owner, pet, date, time, **reason**, link to clinic appointments.

### 2. Appointment confirmed (to owner)

**Subject:** Appointment confirmed — {clinicName}  
**Body:** When/where, pet, reason.

### 3. Appointment cancelled (to counterparty)

**Subject:** Appointment cancelled — {petName}  
**Body:** Who cancelled, reason, original slot.

### 4. Medication / care reminder (to owner)

**Subject:** Reminder: {title}  
**Body:** message, dueDate, pet name, link to `/reminders`.

### 5. Password reset

**Subject:** Reset your Vethra password  
**Body:** single-use link with token; expiry note.

## Phase 2

Follow-up thank-you; vaccination due; digest emails.
