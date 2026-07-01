Issue 1 — Authentication & Roles (Owner / Clinic / Admin) Title: Authentication & Role-based accounts (register, login, JWT, role enforcement) Body:

Problem: Need secure sign-up/sign-in flows and role distinctions (owner, vet/clinic, admin).
Implementation:
Backend: Add User model (name, email, passwordHash, role enum: owner|vet|admin, clinicId optional). Use bcryptjs for hashing, jsonwebtoken for access tokens. Implement refresh tokens or set short-lived JWT (30m) + refresh token flow if time allows.
Routes: POST /api/auth/register, POST /api/auth/login, POST /api/auth/refresh, POST /api/auth/logout, GET /api/auth/me.
Middleware: auth middleware that validates JWT and attaches req.user; role-check middleware e.g., requireRole('vet').
Frontend: Pages/components for Register, Login, Logout, profile edit. Store JWT in HttpOnly cookie (recommended) or in memory + refresh token; avoid localStorage for access tokens.
Acceptance criteria:
Owners and vets can register and login and receive JWT.
Protected endpoints reject unauthenticated requests (401) and unauthorized role requests (403).
Can fetch current user profile and role.
Estimate: Medium
Priority: P0
Labels: backend, auth, frontend
Issue 2 — Pet Management (Create/Edit/Delete/View Pet Profiles) Title: Pet Management: CRUD pet profiles with photos and medical summary Body:

Problem: Owners must manage multiple pets; pet records are central to timeline and appointments.
Implementation:
Model: Pet { ownerId, name, species, breed, dob, weight, sex, microchip, allergies[], conditions[], emergencyContact, photoUrl, createdAt, updatedAt }.
Backend: CRUD endpoints: GET /api/pets (owner-scoped), POST /api/pets, GET /api/pets/:id, PUT /api/pets/:id, DELETE /api/pets/:id. Enforce ownerId matches req.user.id or vet/clinic access rules.
Frontend: Pets listing, Add/Edit Pet modal, Pet details page with photo upload UI (uploads go to Cloudinary).
Validation: required name + species; DOB either date or age computation.
Acceptance criteria:
Owner can create/list/edit/delete pets; photo shows after upload.
Vets can view pet profiles for appointments in their clinic.
Estimate: Small
Priority: P0
Labels: backend, frontend, model
Issue 3 — Medical Timeline (Centralized chronological timeline) Title: Medical Timeline: store and display a chronological medical history per pet Body:

Problem: Unified chronological view combining diagnoses, prescriptions, treatments, appointments, uploads.
Implementation:
Model: TimelineItem { petId, type: diagnosis|vaccination|prescription|treatment|appointment|note|upload, title, details, authorId (vet/admin), date, metadata: {diagnosisId, prescriptionId, appointmentId, fileId}, createdAt }.
Backend: GET /api/pets/:petId/timeline?limit=&offset= for paginated chronological results; POST endpoints for adding timeline items as side-effects of diagnosis/prescription/appointment creation.
Frontend: Timeline component that groups items by date, color-codes by type, supports filters (type/date) and quick jump to detail.
Sync: When diagnosis/prescription/appointment models are created, create a corresponding TimelineItem automatically.
Acceptance criteria:
Timeline shows integrated, chronological records for a pet.
New diagnosis/prescription/appointment automatically appears in timeline.
Estimate: Medium
Priority: P0
Labels: backend, frontend, ux
Issue 4 — Veterinary Clinic Profile (public profile, discoverability) Title: Clinic Profile: create & expose clinic profile with contact and hours Body:

Problem: Owners need to browse clinics and see basic info.
Implementation:
Model: Clinic { name, description, address, phone, email, hours (structured), services[], website, location (geo), createdAt }.
Backend: CRUD for clinics by clinic users; public GET /api/clinics and GET /api/clinics/:id with optional query filters (name, location).
Frontend: Browse Clinics page with card list; Clinic detail page with map link and contact actions.
Seed: Use docs/emails.csv to seed a few example clinics for demo.
Acceptance criteria:
Clinics can edit own profile; owners can browse and view clinics.
Estimate: Small
Priority: P0
Labels: backend, frontend, seed
Issue 5 — Veterinary Dashboard (clinic staff daily view) Title: Clinic Dashboard: today's appointments, requests, recent patients Body:

Problem: Clinic staff need a home screen showing the day's priorities.
Implementation:
Backend: GET /api/clinics/:clinicId/dashboard returns today's appointments, upcoming appointments, appointment requests, recent patients (distinct pets seen).
Frontend: Vet dashboard page with sections: Today's appointments (timeline), Pending requests (action buttons accept/reject), Recent patients (links to pet details).
Real-time: Basic refresh/polling; WebSockets can be stretch-goal.
Acceptance criteria:
Clinic user sees correct lists scoped to their clinic.
Can accept/reject appointment requests from dashboard.
Estimate: Medium
Priority: P0
Labels: backend, frontend, ux
Issue 6 — Appointment Booking System (book/cancel/accept/reject) Title: Appointment booking workflow: book slots, accept/reject, status lifecycle Body:

Problem: Owners must book available slots; clinics manage requests and lifecycle (pending → confirmed/cancelled/completed).
Implementation:
Model: Appointment { petId, ownerId, vetId (or clinicId), clinicId, startAt (ISO), endAt, reason, status: pending|confirmed|cancelled|completed, createdAt }.
Backend:
GET /api/clinics/:clinicId/availability?date= returns available time slots (simple time-slot generation from clinic hours + bookings).
POST /api/appointments (owner books → status=pending).
PATCH /api/appointments/:id to change status (clinic accepts/rejects/completes).
GET /api/appointments?scope=today|owner|clinic
Conflict checking: prevent double-booking.
Frontend: Appointment booking flow: choose clinic → choose date → show slots → confirm booking. Clinic UI to accept/reject.
Timezones: store as ISO UTC timestamps; show localized in frontend.
Acceptance criteria:
Owner can browse slots and create pending appointments.
Clinic can accept or reject; accepted shows status confirmed to owner.
Cancelling updates timeline and sends notification/email.
Estimate: Large
Priority: P0
Labels: backend, frontend, scheduling
Issue 7 — Appointment Details Page & Flow Title: Appointment details: view and update appointment with notes Body:

Problem: Each appointment needs a detail screen for vet notes, status, and attachments.
Implementation:
Data: extend Appointment with notes[], attachments[] (file metadata).
Backend: GET /api/appointments/:id (with permissions), PUT/PATCH to add notes or attachments; when appointment completed, optionally create a timeline item and allow vet to add diagnosis.
Frontend: Appointment detail page showing pet summary, appointment metadata, action buttons: Accept/Reject/Complete, Add Note, Attach File.
Acceptance criteria:
Vets can add notes and attachments to appointments; owners can view after completion per permissions.
Estimate: Small–Medium
Priority: P0
Labels: backend, frontend
Issue 8 — Diagnosis Management (store vet diagnosis & notes) Title: Diagnosis Management: add diagnoses and clinical notes to pet record Body:

Problem: Vets must record diagnoses and treatments as part of the medical timeline.
Implementation:
Model: Diagnosis { petId, vetId, appointmentId?, diagnosisText, notes, treatmentPlan, createdAt }.
Backend: POST /api/diagnoses, GET /api/diagnoses?petId=, link to timeline on create.
Frontend: Diagnosis form UI (used during appointment), ability to attach prescriptions and set reminders.
Acceptance criteria:
Vet can create diagnosis linked to appointment and it appears on pet timeline.
Vet-only permission to create/edit their diagnosis entries.
Estimate: Small–Medium
Priority: P0
Labels: backend, frontend, model
Issue 9 — Prescription Management (tracking meds) Title: Prescription Management: create, view, and track prescriptions Body:

Problem: Need a way to list active and historical prescriptions with dosage & schedule.
Implementation:
Model: Medication/Prescription { petId, diagnosisId, vetId, name, dosage, frequency (structured), duration, startDate, endDate, instructions, active (bool), createdAt }.
Backend: CRUD endpoints /api/prescriptions; a computed field to return nextDue.
Frontend: Prescriptions list on pet profile, prescription detail with ability to mark doses as taken if needed (or link to Treatment Progress Tracker).
Acceptance criteria:
Vet can create prescriptions; owner can view active/previous prescriptions.
Prescription dates/duration calculate active status correctly.
Estimate: Small
Priority: P0
Labels: backend, frontend, model
Issue 10 — Reminder System (scheduling reminders + email) Title: Reminder System: create reminders for meds, follow-ups and send notifications Body:

Problem: Owners must receive reminders (email) for medication, follow-up appointments and vaccine schedules.
Implementation:
Model: Reminder { petId, ownerId, title, type: medication|vaccination|followup, rule: cron-like or simple repeats (every X hours/days) or specific datetime(s), status, createdFrom (prescriptionId), nextDue }.
Worker: Lightweight job runner or scheduled job (e.g., node-cron or serverless scheduled job) that queries reminders and sends emails at nextDue and updates nextDue/status.
Emails: templated emails (Resend/SendGrid/other). Store templates in repo and use transactional provider. Include an unsubscribe link for reminders.
Frontend: Reminders list with ability to mark as completed, snooze, or cancel.
Acceptance criteria:
Create a reminder (manually or from prescription) and email is sent at scheduled time.
Owner can view and mark reminders completed.
Estimate: Medium–Large (depends on worker infra)
Priority: P0
Labels: backend, infra, email
Issue 11 — Treatment Progress Tracker (owner updates & compliance) Title: Treatment Progress Tracker: owner-facing task checklist for treatments Body:

Problem: Owners should mark assigned care tasks (med dose given, exercises) so vets can track compliance.
Implementation:
Model: Task { petId, reminderId?, title, dueAt, status: in_progress|completed|missed, notes, createdBy }.
Backend: endpoints for owner to list tasks and update status; optional integration with Reminder to auto-create tasks for each scheduled medication dose.
Frontend: Task list on owner dashboard and on pet timeline; allow quick marking, bulk actions, and history.
Reporting: Simple compliance metric (percent completed) on pet/clinic dashboards.
Acceptance criteria:
Owner can change task status; vet can view compliance history.
Estimate: Small–Medium
Priority: P1
Labels: backend, frontend, analytics
Issue 12 — Medical Document Uploads (Cloudinary integration) Title: Medical Document Uploads: upload & serve PDFs/images, attach to pet/appointments Body:

Problem: Owners/clinics need to upload vaccination certificates, x-rays, labs.
Implementation:
Storage: Cloudinary (per docs) or S3 if preferred. Backend will accept signed uploads or upload via server to avoid exposing secrets.
Model: File { petId?, appointmentId?, uploadedBy, url, mimeType, size, publicId, createdAt }.
Backend: POST /api/uploads to accept file metadata and store/return URL; remove endpoint to delete.
Frontend: File upload UI with preview; restrict file types to PDF/JPG/PNG and size limit (e.g., 10MB).
Security: Serve files via signed URLs or preserve privacy for private docs; public clinic documents can be public.
Acceptance criteria:
Able to upload PDF/PNG/JPG and attach to pet/appointment and view/download in UI.
Estimate: Small
Priority: P0
Labels: backend, frontend, infra
Issue 13 — Search (patients by pet name, owner, microchip) Title: Search: fast lookup by pet name, owner name, microchip number Body:

Problem: Clinics need quick search to find patient records.
Implementation:
Backend: /api/search/patients?q= with mongoose text indexes on pet.name, owner.name, microchip; support exact microchip match param microchip=.
Pagination and result ranking: owners first, exact matches prioritized.
Frontend: Search input in clinic UI with typeahead/autocomplete showing pet + owner + microchip.
Acceptance criteria:
Clinic user can find patients by pet name, owner name, or microchip reliably and quickly.
Estimate: Small
Priority: P0
Labels: backend, frontend, performance
Issue 14 — Owner Dashboard (aggregate view) Title: Owner Dashboard: upcoming appointments, active reminders, medication schedule Body:

Problem: Owners need a single screen to see what matters.
Implementation:
Backend: GET /api/owners/:ownerId/dashboard returns upcoming appointments, next reminders, active prescriptions, timeline highlights.
Frontend: Dashboard with cards: Next appointment, Active reminders (with quick mark done), Medication schedule (today), Pet list with quick links.
Acceptance criteria:
Owner sees correct aggregated data for their pets.
Estimate: Small
Priority: P0
Labels: frontend, ux
Issue 15 — Email Notifications & Templates (transactional emails) Title: Email notifications: templates & send flows for appointment & reminder events Body:

Problem: Automated emails required for booking confirmations, reminders.
Implementation:
Define templates: appointment-booked, appointment-confirmed, appointment-cancelled, reminder, followup.
Backend service: emailService.send(template, recipient, variables). Enqueue sends to worker for reliability; retry on failure.
Frontend: show notification state for sent/unavailable.
Unsubscribe/opt-out: per-owner preference for reminders.
Acceptance criteria:
Emails are sent for booking/confirm/cancel and reminders; templates populate variables (pet, date, clinic).
Estimate: Medium
Priority: P0
Labels: backend, infra, email
Issue 16 — Role-Based Permissions & Authorization Matrix Title: RBAC: enforce role permissions across endpoints and UI Body:

Problem: Owners must not edit diagnoses/prescriptions; vets must not edit other clinics' data.
Implementation:
Define policy matrix (owner/vet/admin) mapping to API actions.
Implement middleware: requireRole and object-level guards (e.g., pet.ownerId === req.user.id or clinic member).
Add tests for each critical route to assert authorized/unauthorized responses.
Acceptance criteria:
Unauthorized attempts return 403; vets can only manage records within their clinic.
Estimate: Small–Medium
Priority: P0
Labels: backend, security, tests
Issue 17 — Responsive Design & Core UI Pages Title: Responsive UI: implement pages for Public, Owner, and Clinic flows (mobile-first) Body:

Problem: MVP must be demonstrable on mobile/tablet/desktop.
Implementation:
Frontend: Create routes/pages scaffold listed in docs: Landing, About, Login, Register, Browse Clinics, Owner Dashboard, Pets, Pet Details, Timeline, Appointments, Reminders, Profile; Clinic: Dashboard, Appointments, Patients, Patient Details, Diagnosis Form, Prescriptions, Clinic Profile.
Use Tailwind for mobile-first layout; ensure breakpoints and accessible components.
Focus on key flows first (Booking, Appointment lifecycle, Diagnosis + Prescription).
Acceptance criteria:
All core pages are responsive and usable on phone and desktop.
Estimate: Medium
Priority: P0
Labels: frontend, design, accessibility
Issue 18 — Basic Deployment & Environment (MongoDB, env, CI) Title: Deployment & environment: connect MongoDB Atlas, env, basic CI and demo deployment Body:

Problem: Need stable environment for demo (Vercel for frontend, Render/Railway for backend).
Implementation:
Add env.example files for frontend and backend with required vars: MONGODB_URI, JWT_SECRET, CLOUDINARY_URL (or cloud name/key/secret), EMAIL_PROVIDER_API_KEY, FRONTEND_URL, BACKEND_URL.
Dockerfile is optional; use provider native deployments.
CI: basic workflow to run lint/test and deploy.
Seed script: add minimal seed data for demo clinics, demo users, sample pets.
Acceptance criteria:
App can be deployed to demo env with required env vars and seed runs produce demo content.
Estimate: Medium
Priority: P0
Labels: infra, ci, deploy

