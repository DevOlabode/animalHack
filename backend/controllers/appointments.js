const Appointment = require('../models/Appointment');
const Clinic = require('../models/Clinic');
const Pet = require('../models/Pet');
const User = require('../models/User');
const { assertTransition } = require('../services/appointmentStatus');
const {
  sendAppointmentBookedEmail,
  sendClinicNewBookingEmail,
  sendAppointmentConfirmedEmail,
  sendAppointmentCancelledEmail,
} = require('../services/email');

const populateAppointment = (query) => query
  .populate('petId')
  .populate('ownerId', 'name email')
  .populate('clinicId')
  .populate('vetId', 'name email');

const formatAppointment = (appt) => {
  const obj = appt.toObject();
  return {
    ...obj,
    pet: obj.petId,
    owner: obj.ownerId,
    clinic: obj.clinicId,
    vet: obj.vetId,
    petId: obj.petId?._id ?? obj.petId,
    ownerId: obj.ownerId?._id ?? obj.ownerId,
    clinicId: obj.clinicId?._id ?? obj.clinicId,
    vetId: obj.vetId?._id ?? obj.vetId,
  };
};

const listOwnerAppointments = async (req, res, next) => {
  try {
    const filter = { ownerId: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const appointments = await populateAppointment(
      Appointment.find(filter).sort({ date: 1, time: 1 })
    ).exec();
    res.json({ status: 'success', data: { appointments: appointments.map(formatAppointment) } });
  } catch (error) {
    next(error);
  }
};

const listClinicAppointments = async (req, res, next) => {
  try {
    const clinic = await Clinic.findOne({ userId: req.user._id });
    if (!clinic) {
      return res.status(404).json({ status: 'error', message: 'Clinic profile not found' });
    }

    const filter = { clinicId: clinic._id };
    if (req.query.status) filter.status = req.query.status;

    const appointments = await populateAppointment(
      Appointment.find(filter).sort({ date: 1, time: 1 })
    ).exec();
    res.json({ status: 'success', data: { appointments: appointments.map(formatAppointment) } });
  } catch (error) {
    next(error);
  }
};

const bookAppointment = async (req, res, next) => {
  try {
    const { petId, clinicId, date, time, reason } = req.body ?? {};
    const trimmedReason = reason?.trim?.() ?? '';

    if (!petId || !clinicId || !date || !time || !trimmedReason) {
      return res.status(400).json({ status: 'error', message: 'Pet, clinic, date, time, and reason are required' });
    }

    if (trimmedReason.length < 3 || trimmedReason.length > 500) {
      return res.status(400).json({ status: 'error', message: 'Reason must be 3–500 characters' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(`${date}T12:00:00`);
    if (Number.isNaN(bookingDate.getTime()) || bookingDate < today) {
      return res.status(400).json({ status: 'error', message: 'Appointment date must be today or in the future' });
    }

    const pet = await Pet.findOne({ _id: petId, ownerId: req.user._id });
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found' });

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ status: 'error', message: 'Clinic not found' });

    const conflict = await Appointment.findOne({
      clinicId,
      date: bookingDate,
      time,
      status: { $in: ['pending', 'confirmed'] },
    });
    if (conflict) {
      return res.status(409).json({ status: 'error', message: 'This time slot is no longer available' });
    }

    const appointment = await Appointment.create({
      petId,
      ownerId: req.user._id,
      clinicId,
      vetId: clinic.userId,
      date: bookingDate,
      time,
      reason: trimmedReason,
      status: 'pending',
    });

    const populated = await populateAppointment(Appointment.findById(appointment._id)).exec();
    const formatted = formatAppointment(populated);
    const clinicUser = await User.findById(clinic.userId);
    const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

    try {
      await sendAppointmentBookedEmail({
        to: req.user.email,
        ownerName: req.user.name,
        petName: pet.name,
        clinicName: clinic.name,
        date,
        time,
        reason: trimmedReason,
      });
    } catch (e) {
      console.error('[EMAIL] appointment booked (owner):', e.message);
    }

    try {
      if (clinicUser?.email || clinic.email) {
        await sendClinicNewBookingEmail({
          to: clinicUser?.email || clinic.email,
          clinicName: clinic.name,
          ownerName: req.user.name,
          petName: pet.name,
          species: pet.species,
          breed: pet.breed,
          allergies: pet.allergies,
          date,
          time,
          reason: trimmedReason,
          appointmentsUrl: `${frontendOrigin}/clinic/appointments`,
        });
      }
    } catch (e) {
      console.error('[EMAIL] appointment booked (clinic):', e.message);
    }

    res.status(201).json({ status: 'success', message: 'Appointment booked', data: { appointment: formatted } });
  } catch (error) {
    next(error);
  }
};

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, cancellationReason } = req.body ?? {};
    const allowed = ['confirmed', 'cancelled', 'completed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status' });
    }

    const clinic = await Clinic.findOne({ userId: req.user._id });
    const isVet = Boolean(clinic);
    let appointment;

    if (isVet) {
      appointment = await Appointment.findOne({ _id: req.params.id, clinicId: clinic._id });
    } else {
      appointment = await Appointment.findOne({ _id: req.params.id, ownerId: req.user._id });
    }

    if (!appointment) {
      return res.status(404).json({ status: 'error', message: 'Appointment not found' });
    }

    const actorRole = isVet ? 'vet' : 'owner';

    try {
      assertTransition(appointment.status, status, actorRole, cancellationReason);
    } catch (err) {
      return res.status(err.status || 400).json({
        status: 'error',
        code: err.code,
        message: err.message,
      });
    }

    appointment.status = status;
    if (status === 'cancelled') {
      appointment.cancellationReason = cancellationReason.trim();
      appointment.cancelledBy = isVet ? 'clinic' : 'owner';
    }

    await appointment.save();

    const populated = await populateAppointment(Appointment.findById(appointment._id)).exec();
    const formatted = formatAppointment(populated);
    const owner = await User.findById(appointment.ownerId);
    const pet = await Pet.findById(appointment.petId);
    const clinicDoc = await Clinic.findById(appointment.clinicId);
    const clinicUser = clinicDoc ? await User.findById(clinicDoc.userId) : null;
    const dateStr = appointment.date.toISOString().slice(0, 10);

    try {
      if (status === 'confirmed' && owner) {
        await sendAppointmentConfirmedEmail({
          to: owner.email,
          ownerName: owner.name,
          petName: pet?.name,
          clinicName: clinicDoc?.name,
          date: dateStr,
          time: appointment.time,
          reason: appointment.reason,
        });
      }

      if (status === 'cancelled') {
        const payload = {
          petName: pet?.name,
          clinicName: clinicDoc?.name,
          ownerName: owner?.name,
          date: dateStr,
          time: appointment.time,
          reason: appointment.cancellationReason,
          cancelledBy: appointment.cancelledBy,
        };

        if (appointment.cancelledBy === 'owner' && (clinicUser?.email || clinicDoc?.email)) {
          await sendAppointmentCancelledEmail({
            ...payload,
            to: clinicUser?.email || clinicDoc.email,
            recipientName: clinicDoc?.name || 'Clinic',
          });
        } else if (appointment.cancelledBy === 'clinic' && owner) {
          await sendAppointmentCancelledEmail({
            ...payload,
            to: owner.email,
            recipientName: owner.name,
          });
        }
      }
    } catch (e) {
      console.error('[EMAIL] appointment status:', e.message);
    }

    res.json({ status: 'success', data: { appointment: formatted } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listOwnerAppointments,
  listClinicAppointments,
  bookAppointment,
  updateAppointmentStatus,
};
