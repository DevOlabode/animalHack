# Vethra

**AnimalHack 2026** — Digital healthcare platform for pets

## Project Name

**Vethra** — a shared platform where pet owners and veterinary clinics manage medical records, appointments, diagnoses, prescriptions, and follow-up care.

_Previous working titles: VetVault, PetTimeline, PawCare, VetSync, PetCareOS_

---

# Elevator Pitch

A shared digital healthcare platform for pets where pet owners and veterinary clinics can manage medical records, book appointments, track diagnoses, prescribe treatments, and monitor follow-up care from a single system.

Instead of scattered paperwork, every pet has a complete digital medical timeline accessible to both owners and authorized veterinary professionals.

---

# The Problem

Current veterinary care is fragmented.

### Pet Owners

* Lose vaccination records
* Forget medication schedules
* Miss follow-up appointments
* Struggle to transfer records between clinics

### Veterinary Clinics

* Receive incomplete medical histories
* Spend time on paperwork
* Have difficulty tracking follow-ups
* Rely on disconnected systems

### Result

Poor communication, inefficient care, and reduced treatment compliance.

---

# The Solution

A centralized web platform that connects pet owners and veterinary clinics through a shared medical timeline.

The platform provides:

* Digital pet medical records
* Appointment scheduling
* Diagnosis management
* Prescription tracking
* Vaccination tracking
* Treatment reminders
* Follow-up compliance monitoring

---

# Why This Is Better Than A Simple Pet Record App

Most pet record apps only store information.

This platform actively participates in the care process.

Instead of:

> Pet Record Storage

The product becomes:

> Pet Care Management System

or

> Veterinary Care Operating System

This creates much stronger business potential.

---

# Primary Users

## Pet Owners

Can:

* Create pet profiles
* Upload records
* Book appointments
* View diagnoses
* View prescriptions
* Track vaccinations
* Receive reminders
* Mark treatments as completed

---

## Veterinarians

Can:

* Access pet history
* Review previous diagnoses
* Review allergies
* Review medications
* Add new diagnoses
* Create treatment plans
* Add prescriptions
* Schedule follow-ups

---

## Clinic Administrators

Can:

* Manage veterinarians
* Manage schedules
* Manage appointments
* View clinic statistics
* Manage patient records

---

# Core Product Vision

Every pet should have a digital medical passport.

Every veterinarian who treats the pet contributes to that record.

Every owner can access and manage the pet's healthcare journey.

---

# MVP Scope (Hackathon Version)

Build ONLY these features.

## Authentication

Roles:

* Pet Owner
* Veterinary Clinic

---

## Pet Profiles

Fields:

* Name
* Species
* Breed
* Age
* Weight
* Allergies
* Medical Notes

---

## Medical Timeline

Display:

* Diagnoses
* Vaccinations
* Prescriptions
* Treatments
* Appointments

Presented chronologically.

---

## Appointment Booking

Owners can:

* Browse clinics
* View available time slots
* Book appointments

Veterinarians can:

* Accept appointments
* Reject appointments
* View daily schedule

---

## Diagnosis Management

Veterinarian can:

* Enter diagnosis
* Add notes
* Record treatment plan

---

## Prescription Tracking

Veterinarian can:

* Add medication
* Define dosage
* Define duration

Owner can:

* View active medications

---

## Reminder System

Veterinarian creates reminders for:

* Medication schedules
* Follow-up appointments
* Vaccinations
* Care instructions

Owner receives:

* Email reminders

---

## Compliance Tracking

Owner can mark tasks as:

* Completed
* Skipped
* In Progress

Examples:

* Medication given
* Follow-up completed
* Vaccination received

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB

---

## Authentication

* JWT Authentication
* Role-Based Access Control

---

## File Storage

* Cloudinary

Used for:

* Medical documents
* Vaccination certificates
* Pet images

---

## Emails

* Resend

Used for:

* Reminders
* Appointment confirmations
* Follow-up notifications

---

## Deployment

Frontend:

* Vercel

Backend:

* Railway or Render

Database:

* MongoDB Atlas

---

# Suggested Database Models

## User

```js
{
  name,
  email,
  password,
  role: "owner" | "vet" | "admin"
}
```

## Pet

```js
{
  ownerId,
  name,
  species,
  breed,
  age,
  weight,
  allergies,
  medicalNotes
}
```

## Appointment

```js
{
  petId,
  ownerId,
  vetId,
  clinicId,
  date,
  status
}
```

## Diagnosis

```js
{
  petId,
  vetId,
  diagnosis,
  notes,
  createdAt
}
```

## Medication

```js
{
  petId,
  diagnosisId,
  name,
  dosage,
  frequency,
  duration
}
```

## Reminder

```js
{
  petId,
  ownerId,
  title,
  dueDate,
  status
}
```

# Future SaaS Roadmap (Post-Hackathon)

## Phase 2

### Multi-Clinic Support

* Transfer records between clinics
* Shared medical history

### Advanced Scheduling

* Recurring appointments
* Waitlists
* Appointment rescheduling

### Clinic Dashboard

* Patient analytics
* Appointment analytics
* Revenue analytics

### Notification Center

* SMS notifications
* Push notifications

---

## Phase 3

### Telemedicine

* Video consultations
* Secure chat

### Veterinary Marketplace

* Discover nearby clinics
* Compare services

### Pet Insurance Integration

* Claim assistance
* Medical record export

### Mobile Apps

* iOS App
* Android App

---

## Phase 4

### AI-Assisted Features

Not core product features.

Possible additions:

* Record summarization
* Medication explanation
* Treatment compliance insights

---

# Revenue Model

## Recommended Strategy

Charge clinics.

Do NOT focus on charging pet owners initially.

---

## Free Tier

* 1 veterinarian
* Limited appointments
* Limited pets

---

## Starter Plan

$29/month

* 1-2 veterinarians
* Appointment scheduling
* Medical records

---

## Professional Plan

$79/month

* Unlimited pets
* Unlimited appointments
* Advanced reminders
* Analytics

---

## Enterprise

Custom Pricing

* Multi-location clinics
* White-label solutions
* API access

---

# Why Clinics Pay

The platform helps them:

* Reduce paperwork
* Improve organization
* Improve patient retention
* Improve follow-up compliance
* Access patient history faster

---

# Competitive Advantages

Most competitors focus on pet owners.

This platform focuses on the relationship between:

* Pet Owner
* Veterinarian
* Clinic

The shared medical timeline becomes the unique selling point.

---

# What NOT To Build During The Hackathon

Avoid:

* Payment processing
* Telemedicine
* Insurance systems
* Prescription fulfillment
* Complex integrations
* AI diagnosis
* Mobile applications

These features create unnecessary complexity.

---

# Why This Could Win AnimalHack

It addresses multiple hackathon themes:

* Improving animal welfare
* Supporting pet owners
* Supporting veterinarians
* Improving healthcare outcomes
* Increasing treatment compliance

It is:

* Practical
* Technically achievable
* Commercially viable
* Easy to demonstrate

Most importantly, it solves a real problem rather than being another generic animal-related application.

---

# Success Criteria For The Hackathon

The MVP should allow:

1. Owner registration
2. Clinic registration
3. Pet profile creation
4. Appointment booking
5. Vet diagnosis entry
6. Medication tracking
7. Reminder generation
8. Treatment completion tracking

If these workflows work smoothly from end to end, the project is strong enough for submission and provides a foundation for a future SaaS business.
