const Clinic = require('../models/Clinic');
const Appointment = require('../models/Appointment');

const SLOT_TIMES = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

const listClinics = async (_req, res, next) => {
  try {
    const clinics = await Clinic.find().sort({ name: 1 });
    res.json({ status: 'success', data: { clinics } });
  } catch (error) {
    next(error);
  }
};

const getClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ status: 'error', message: 'Clinic not found' });
    }
    res.json({ status: 'success', data: { clinic } });
  } catch (error) {
    next(error);
  }
};

const getClinicSlots = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ status: 'error', message: 'Date query param is required' });
    }

    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ status: 'error', message: 'Clinic not found' });
    }

    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59`);

    const booked = await Appointment.find({
      clinicId: clinic._id,
      date: { $gte: dayStart, $lte: dayEnd },
      status: { $in: ['pending', 'confirmed'] },
    }).select('time');

    const bookedTimes = new Set(booked.map((a) => a.time));
    const available = SLOT_TIMES.filter((t) => !bookedTimes.has(t));

    res.json({ status: 'success', data: { slots: available } });
  } catch (error) {
    next(error);
  }
};

module.exports = { listClinics, getClinic, getClinicSlots };
