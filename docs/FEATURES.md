# PetTimeline MVP Features (AnimalHack 2026)

## Overview

The goal of the MVP is to demonstrate a complete digital workflow between **pet owners** and **veterinary clinics**. The application should show how an entire veterinary visit—from booking an appointment to completing treatment—can be managed digitally without relying on paperwork.

The core question the MVP should answer is:

> **Can a pet owner and a veterinary clinic manage an entire visit—from booking an appointment to completing treatment—through one centralized platform?**

If the answer is **yes**, then the MVP has accomplished its purpose.

---

# MVP Features

---

# 1. Authentication & User Roles

The application will support two primary user roles.

## Pet Owner

* Register
* Login
* Logout
* Edit Profile

## Veterinary Clinic

* Register
* Login
* Logout
* Edit Clinic Profile

---

# 2. Pet Management

Pet owners can create and manage profiles for each of their pets.

### Features

* Add Pet
* Edit Pet Information
* Delete Pet
* View Pet Profile

### Pet Information

* Pet Name
* Species
* Breed
* Date of Birth
* Age
* Weight
* Sex
* Microchip Number (Optional)
* Allergies
* Existing Medical Conditions
* Emergency Contact
* Pet Photo

---

# 3. Medical Timeline

Every pet has a centralized medical timeline displaying its complete medical history.

The timeline should include:

* Diagnoses
* Vaccinations
* Prescriptions
* Treatments
* Surgeries
* Previous Appointments
* Medical Notes

The timeline should be displayed chronologically so veterinarians can quickly understand the pet's medical history.

---

# 4. Veterinary Clinic Profile

Every clinic has a public profile containing:

* Clinic Name
* Clinic Description
* Address
* Phone Number
* Email Address
* Operating Hours

This information allows pet owners to discover clinics and schedule appointments.

---

# 5. Veterinary Dashboard

The clinic dashboard should display:

* Today's Appointments
* Upcoming Appointments
* Appointment Requests
* Recent Patients

This serves as the veterinarian's home screen.

---

# 6. Appointment Booking System

Pet owners should be able to:

* Browse available clinics
* View available appointment slots
* Book appointments
* Cancel appointments

Veterinary clinics should be able to:

* Accept appointment requests
* Reject appointment requests
* Mark appointments as completed

### Appointment Status

* Pending
* Confirmed
* Cancelled
* Completed

---

# 7. Appointment Details

Every appointment contains:

* Date
* Time
* Pet
* Owner
* Clinic
* Reason for Visit
* Appointment Status

---

# 8. Diagnosis Management

After an appointment, veterinarians can record:

* Diagnosis
* Clinical Notes
* Treatment Plan

These records become part of the pet's permanent medical history.

---

# 9. Prescription Management

Veterinarians can prescribe medications.

Each prescription contains:

* Medication Name
* Dosage
* Frequency
* Duration
* Additional Instructions

Pet owners can view both active and previous prescriptions.

---

# 10. Reminder System

Veterinarians can schedule reminders for:

* Medication Times
* Vaccinations
* Follow-up Appointments
* Special Care Instructions

Owners receive reminder emails automatically.

---

# 11. Treatment Progress Tracker

Pet owners can update the status of assigned care tasks.

Task Status

* Completed
* Missed
* In Progress

Examples include:

* Morning Medication
* Evening Medication
* Bandage Change
* Daily Exercise
* Follow-up Completed

This feature helps veterinarians monitor treatment compliance.

---

# 12. Medical Document Uploads

Owners can upload important medical documents.

Supported Documents

* Vaccination Certificates
* Lab Reports
* Blood Work
* X-rays
* Referral Documents

Supported Formats

* PDF
* JPG
* PNG

---

# 13. Search

Veterinarians should be able to quickly search for patients using:

* Pet Name
* Owner Name
* Microchip Number

---

# 14. Owner Dashboard

The owner's dashboard displays:

* Upcoming Appointments
* Active Reminders
* Medication Schedule
* Medical Timeline
* Recent Diagnoses

This provides a centralized view of the pet's healthcare.

---

# 15. Email Notifications

Automatic email notifications should be sent when:

* Appointment Booked
* Appointment Confirmed
* Appointment Cancelled
* Medication Reminder
* Follow-up Reminder

---

# 16. Role-Based Permissions

## Pet Owners

Cannot:

* Edit Diagnoses
* Edit Prescriptions
* Modify Clinic Records

## Veterinarians

Cannot:

* Modify Owner Accounts
* Edit Records Belonging to Other Clinics

---

# 17. Responsive Design

The MVP should work seamlessly on:

* Desktop
* Tablet
* Mobile Browser

A native mobile application is **not** required for the hackathon.

---

# Application Pages

## Public Pages

* Landing Page
* About
* Login
* Register
* Browse Clinics

---

## Pet Owner Pages

* Dashboard
* Pets
* Pet Details
* Medical Timeline
* Appointments
* Reminders
* Profile

---

## Veterinary Clinic Pages

* Dashboard
* Appointments
* Patients
* Patient Details
* Diagnosis Form
* Prescriptions
* Clinic Profile

---

# MVP User Flow

The hackathon demonstration should showcase the following workflow:

1. A veterinary clinic registers on the platform.
2. A pet owner creates an account.
3. The owner adds a pet profile.
4. The owner books an appointment with a participating clinic.
5. The clinic reviews and confirms the appointment.
6. During the appointment, the veterinarian views the pet's complete medical timeline.
7. The veterinarian records a diagnosis and prescribes medication.
8. The veterinarian schedules medication and follow-up reminders.
9. The owner receives reminder emails and marks treatments as completed.
10. During the next appointment, the veterinarian can review the pet's updated treatment history and compliance record.

This demonstrates the complete end-to-end value of the platform.

---

# Stretch Goals (Only If Time Allows)

If the core MVP is complete, consider implementing one or two of the following enhancements:

* Clinic search with filters (location, services)
* Calendar view for appointments
* Vaccination expiration alerts
* Printable medical summary (PDF)
* Secure sharing of pet records with another clinic
* Basic clinic analytics (appointments completed, follow-up rate)

---

# Success Criteria

The MVP will be considered successful if it demonstrates the following complete workflow:

* User Authentication
* Pet Profile Creation
* Veterinary Clinic Registration
* Appointment Booking
* Appointment Management
* Medical Timeline
* Diagnosis Entry
* Prescription Management
* Reminder Scheduling
* Treatment Progress Tracking

If these features work together smoothly, the project successfully demonstrates a modern digital healthcare workflow for veterinary clinics and pet owners while providing a strong foundation for a future SaaS platform.
