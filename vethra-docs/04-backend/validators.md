# Joi Validators

**Location:** `backend/validators/*.js` (create if absent)

## Appointment — create

```js
const Joi = require('joi');

exports.createAppointment = Joi.object({
  petId: Joi.string().hex().length(24).required(),
  clinicId: Joi.string().hex().length(24).required(),
  date: Joi.date().iso().required(),
  time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  reason: Joi.string().trim().min(3).max(500).required(),
});
```

## Appointment — status

```js
exports.updateAppointmentStatus = Joi.object({
  status: Joi.string().valid('confirmed', 'cancelled', 'completed').required(),
  cancellationReason: Joi.when('status', {
    is: 'cancelled',
    then: Joi.string().trim().min(3).max(500).required(),
    otherwise: Joi.forbidden(),
  }),
});
```

> Decline = `status: 'cancelled'` with clinic `cancelledBy` set server-side + reason.

## Pet — create/update

```js
exports.pet = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  species: Joi.string().trim().required(),
  breed: Joi.string().trim().required(),
  dateOfBirth: Joi.date().iso().max('now').required(),
  weight: Joi.number().min(0).required(),
  sex: Joi.string().valid('male', 'female', 'unknown').required(),
  microchipNumber: Joi.string().allow('').max(64),
  allergies: Joi.string().allow('').max(2000),
  medicalConditions: Joi.string().allow('').max(2000),
  emergencyContact: Joi.string().trim().min(1).max(200).required(),
  photoUrl: Joi.string().uri().allow(''),
});
```

## Auth — signup owner

```js
exports.signupOwner = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});
```

## Auth — signup clinic

Owner fields + clinic: `clinicName` or nested `clinic: { name, description, address, phone, email, operatingHours }`.

## Diagnosis create

`petId`, `diagnosis` required; `appointmentId`, `clinicalNotes`, `treatmentPlan` optional.

## Prescription create

`petId`, `medicationName`, `dosage`, `frequency`, `duration` required; links optional.

## Reminder create

`petId`, `type`, `title`, `dueDate` required; `message` optional.

## Treatment task status

`status: completed | missed | in_progress`

## Document create

`title`, `documentType`, `fileType`, `fileUrl` required.
