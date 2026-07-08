const Appointment = require('../models/Appointment');
const Clinic = require('../models/Clinic');
const Pet = require('../models/Pet');
const User = require('../models/User');
const {
  sendAppointmentBookedEmail,
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
    const appointments = await populateAppointment(
      Appointment.find({ ownerId: req.user._id }).sort({ date: 1, time: 1 })
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
    const appointments = await populateAppointment(
      Appointment.find({ clinicId: clinic._id }).sort({ date: 1, time: 1 })
    ).exec();
    res.json({ status: 'success', data: { appointments: appointments.map(formatAppointment) } });
  } catch (error) {
    next(error);
  }
};

const bookAppointment = async (req, res, next) => {
  try {
    const { petId, clinicId, date, time, reason } = req.body ?? {};
    if (!petId || !clinicId || !date || !time || !reason?.trim()) {
      return res.status(400).json({ status: 'error', message: 'Pet, clinic, date, time, and reason are required' });
    }

    const pet = await Pet.findOne({ _id: petId, ownerId: req.user._id });
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found' });

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ status: 'error', message: 'Clinic not found' });

    const conflict = await Appointment.findOne({
      clinicId,
      date: new Date(`${date}T12:00:00`),
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
      date: new Date(`${date}T12:00:00`),
      time,
      reason: reason.trim(),
      status: 'pending',
    });

    const populated = await populateAppointment(Appointment.findById(appointment._id)).exec();
    const formatted = formatAppointment(populated);

    try {
      await sendAppointmentBookedEmail({
        to: req.user.email,
        ownerName: req.user.name,
        petName: pet.name,
        clinicName: clinic.name,
        date,
        time,
      });
    } catch (e) {
      console.error('[EMAIL] appointment booked:', e.message);
    }

    res.status(201).json({ status: 'success', message: 'Appointment booked', data: { appointment: formatted } });
  } catch (error) {
    next(error);
  }
};

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body ?? {};
    const allowed = ['confirmed', 'cancelled', 'completed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status' });
    }

    const clinic = await Clinic.findOne({ userId: req.user._id });
    let appointment;

    if (clinic) {
      appointment = await Appointment.findOne({ _id: req.params.id, clinicId: clinic._id });
    } else {
      appointment = await Appointment.findOne({ _id: req.params.id, ownerId: req.user._id });
      if (status !== 'cancelled') {
        return res.status(403).json({ status: 'error', message: 'Owners can only cancel appointments' });
      }
    }

    if (!appointment) {
      return res.status(404).json({ status: 'error', message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    const populated = await populateAppointment(Appointment.findById(appointment._id)).exec();
    const formatted = formatAppointment(populated);
    const owner = await User.findById(appointment.ownerId);
    const pet = await Pet.findById(appointment.petId);
    const clinicDoc = await Clinic.findById(appointment.clinicId);

    try {
      if (status === 'confirmed' && owner) {
        await sendAppointmentConfirmedEmail({
          to: owner.email,
          ownerName: owner.name,
          petName: pet?.name,
          clinicName: clinicDoc?.name,
          date: appointment.date.toISOString().slice(0, 10),
          time: appointment.time,
        });
      }
      if (status === 'cancelled' && owner) {
        await sendAppointmentCancelledEmail({
          to: owner.email,
          ownerName: owner.name,
          petName: pet?.name,
          clinicName: clinicDoc?.name,
          date: appointment.date.toISOString().slice(0, 10),
          time: appointment.time,
        });
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
