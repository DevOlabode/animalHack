const Appointment = require('../models/Appointment');
const Diagnosis = require('../models/Diagnosis');
const Prescription = require('../models/Prescription');
const Reminder = require('../models/Reminder');
const TreatmentTask = require('../models/TreatmentTask');
const MedicalDocument = require('../models/MedicalDocument');
const Pet = require('../models/Pet');
const Clinic = require('../models/Clinic');
const User = require('../models/User');
const { sendReminderEmail, sendMedicationReminderEmail } = require('../services/email');

const getClinicForVet = async (userId) => Clinic.findOne({ userId });

const canAccessPet = async (user, petId) => {
  const pet = await Pet.findById(petId);
  if (!pet) return null;

  if (user.role === 'pet_owner' || user.role === 'owner') {
    return pet.ownerId.toString() === user._id.toString() ? pet : null;
  }

  if (user.role === 'vet') {
    const clinic = await getClinicForVet(user._id);
    if (!clinic) return null;
    const hasAppointment = await Appointment.findOne({ petId, clinicId: clinic._id });
    return hasAppointment ? pet : null;
  }

  return null;
};

const getTimeline = async (req, res, next) => {
  try {
    const pet = await canAccessPet(req.user, req.params.petId);
    if (!pet) {
      return res.status(404).json({ status: 'error', message: 'Pet not found or access denied' });
    }

    const petId = pet._id;
    const [appointments, diagnoses, prescriptions, reminders, documents, tasks] = await Promise.all([
      Appointment.find({ petId }).populate('clinicId'),
      Diagnosis.find({ petId }).populate('clinicId'),
      Prescription.find({ petId }).populate('clinicId'),
      Reminder.find({ petId }),
      MedicalDocument.find({ petId }),
      TreatmentTask.find({ petId }),
    ]);

    const entries = [
      ...appointments.map((a) => ({
        type: 'appointment',
        date: a.date,
        title: `Appointment — ${a.reason}`,
        description: `Status: ${a.status} at ${a.time}`,
        data: a,
      })),
      ...diagnoses.map((d) => ({
        type: 'diagnosis',
        date: d.createdAt,
        title: d.diagnosis,
        description: d.clinicalNotes,
        data: d,
      })),
      ...prescriptions.map((p) => ({
        type: 'prescription',
        date: p.createdAt,
        title: `Prescription: ${p.medicationName}`,
        description: `${p.dosage} — ${p.frequency}`,
        data: p,
      })),
      ...reminders.map((r) => ({
        type: 'reminder',
        date: r.dueDate,
        title: r.title,
        description: r.message,
        data: r,
      })),
      ...tasks.map((t) => ({
        type: 'task',
        date: t.dueDate || t.updatedAt || t.createdAt,
        title: `Treatment task: ${t.title}`,
        description: `Status: ${t.status}${t.description ? ` — ${t.description}` : ''}`,
        data: t,
      })),
      ...documents.map((d) => ({
        type: 'document',
        date: d.createdAt,
        title: d.title,
        description: d.documentType,
        data: d,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ status: 'success', data: { timeline: entries } });
  } catch (error) {
    next(error);
  }
};

const createDiagnosis = async (req, res, next) => {
  try {
    const clinic = await getClinicForVet(req.user._id);
    if (!clinic) return res.status(403).json({ status: 'error', message: 'Clinic not found' });

    const { petId, appointmentId, diagnosis, clinicalNotes, treatmentPlan } = req.body ?? {};
    if (!petId || !diagnosis?.trim()) {
      return res.status(400).json({ status: 'error', message: 'Pet and diagnosis are required' });
    }

    const pet = await canAccessPet(req.user, petId);
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found or access denied' });

    const record = await Diagnosis.create({
      petId,
      appointmentId,
      clinicId: clinic._id,
      vetId: req.user._id,
      diagnosis: diagnosis.trim(),
      clinicalNotes: clinicalNotes?.trim() ?? '',
      treatmentPlan: treatmentPlan?.trim() ?? '',
    });

    if (appointmentId) {
      const appointment = await Appointment.findOne({
        _id: appointmentId,
        petId,
        clinicId: clinic._id,
      });
      if (appointment && appointment.status === 'confirmed') {
        appointment.status = 'completed';
        await appointment.save();
      }
    }

    res.status(201).json({ status: 'success', data: { diagnosis: record } });
  } catch (error) {
    next(error);
  }
};

const createPrescription = async (req, res, next) => {
  try {
    const clinic = await getClinicForVet(req.user._id);
    if (!clinic) return res.status(403).json({ status: 'error', message: 'Clinic not found' });

    const {
      petId, appointmentId, diagnosisId,
      medicationName, dosage, frequency, duration, instructions,
    } = req.body ?? {};

    if (!petId || !medicationName?.trim() || !dosage || !frequency || !duration) {
      return res.status(400).json({ status: 'error', message: 'Required prescription fields missing' });
    }

    const pet = await canAccessPet(req.user, petId);
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found or access denied' });

    const prescription = await Prescription.create({
      petId,
      appointmentId,
      diagnosisId,
      clinicId: clinic._id,
      vetId: req.user._id,
      medicationName: medicationName.trim(),
      dosage,
      frequency,
      duration,
      instructions: instructions?.trim() ?? '',
    });

    res.status(201).json({ status: 'success', data: { prescription } });
  } catch (error) {
    next(error);
  }
};

const listPrescriptions = async (req, res, next) => {
  try {
    const pet = await canAccessPet(req.user, req.params.petId);
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found or access denied' });

    const prescriptions = await Prescription.find({ petId: pet._id }).sort({ createdAt: -1 });
    res.json({ status: 'success', data: { prescriptions } });
  } catch (error) {
    next(error);
  }
};

const createReminder = async (req, res, next) => {
  try {
    const clinic = await getClinicForVet(req.user._id);
    if (!clinic) return res.status(403).json({ status: 'error', message: 'Clinic not found' });

    const { petId, type, title, message, dueDate, prescriptionId, appointmentId } = req.body ?? {};
    if (!petId || !type || !title?.trim() || !dueDate) {
      return res.status(400).json({ status: 'error', message: 'Pet, type, title, and due date are required' });
    }

    const pet = await canAccessPet(req.user, petId);
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found or access denied' });

    const reminder = await Reminder.create({
      petId,
      ownerId: pet.ownerId,
      clinicId: clinic._id,
      vetId: req.user._id,
      type,
      title: title.trim(),
      message: message?.trim() ?? '',
      dueDate: new Date(dueDate),
      prescriptionId,
      appointmentId,
    });

    const task = await TreatmentTask.create({
      petId,
      ownerId: pet.ownerId,
      reminderId: reminder._id,
      prescriptionId,
      title: title.trim(),
      description: message?.trim() ?? '',
      dueDate: new Date(dueDate),
      status: 'in_progress',
    });

    const owner = await User.findById(pet.ownerId);
    try {
      if (type === 'medication') {
        await sendMedicationReminderEmail({ to: owner.email, ownerName: owner.name, petName: pet.name, title, message, dueDate });
      } else {
        await sendReminderEmail({ to: owner.email, ownerName: owner.name, petName: pet.name, title, message, dueDate });
      }
      reminder.emailSent = true;
      await reminder.save();
    } catch (e) {
      console.error('[EMAIL] reminder:', e.message);
    }

    res.status(201).json({ status: 'success', data: { reminder, task } });
  } catch (error) {
    next(error);
  }
};

const listOwnerReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ ownerId: req.user._id })
      .populate('petId', 'name')
      .sort({ dueDate: 1 });
    res.json({ status: 'success', data: { reminders } });
  } catch (error) {
    next(error);
  }
};

const listOwnerTasks = async (req, res, next) => {
  try {
    const tasks = await TreatmentTask.find({ ownerId: req.user._id })
      .populate('petId', 'name')
      .sort({ dueDate: 1 });
    res.json({ status: 'success', data: { tasks } });
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body ?? {};
    if (!['completed', 'missed', 'in_progress'].includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status' });
    }

    const task = await TreatmentTask.findOne({ _id: req.params.id, ownerId: req.user._id });
    if (!task) return res.status(404).json({ status: 'error', message: 'Task not found' });

    task.status = status;
    await task.save();
    res.json({ status: 'success', data: { task } });
  } catch (error) {
    next(error);
  }
};

const uploadDocument = async (req, res, next) => {
  try {
    const { petId, title, documentType, fileType, fileUrl } = req.body ?? {};
    if (!petId || !title?.trim() || !fileType || !fileUrl) {
      return res.status(400).json({ status: 'error', message: 'All document fields are required' });
    }

    const pet = await Pet.findOne({ _id: petId, ownerId: req.user._id });
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found' });

    if (fileUrl.length > 3_000_000) {
      return res.status(400).json({ status: 'error', message: 'File is too large' });
    }

    const document = await MedicalDocument.create({
      petId,
      ownerId: req.user._id,
      title: title.trim(),
      documentType: documentType ?? 'other',
      fileType,
      fileUrl,
    });

    res.status(201).json({ status: 'success', data: { document } });
  } catch (error) {
    next(error);
  }
};

const listDocuments = async (req, res, next) => {
  try {
    const pet = await canAccessPet(req.user, req.params.petId);
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found or access denied' });

    const documents = await MedicalDocument.find({ petId: pet._id }).sort({ createdAt: -1 });
    res.json({ status: 'success', data: { documents } });
  } catch (error) {
    next(error);
  }
};

const searchPatients = async (req, res, next) => {
  try {
    const clinic = await getClinicForVet(req.user._id);
    if (!clinic) return res.status(403).json({ status: 'error', message: 'Clinic not found' });

    const q = (req.query.q ?? '').trim();
    if (!q) {
      return res.json({ status: 'success', data: { patients: [] } });
    }

    const appointments = await Appointment.find({ clinicId: clinic._id }).distinct('petId');
    const pets = await Pet.find({
      _id: { $in: appointments },
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { microchipNumber: { $regex: q, $options: 'i' } },
      ],
    });

    const ownerIds = [...new Set(pets.map((p) => p.ownerId.toString()))];
    const owners = await User.find({ _id: { $in: ownerIds } });
    const ownerMap = Object.fromEntries(owners.map((o) => [o._id.toString(), o]));

    let results = pets.map((pet) => ({
      pet: pet.toSafeObject(),
      owner: ownerMap[pet.ownerId.toString()]?.toSafeObject?.() ?? ownerMap[pet.ownerId.toString()],
    }));

    const ownerMatches = owners.filter((o) => o.name.toLowerCase().includes(q.toLowerCase()));
    for (const owner of ownerMatches) {
      const ownerPets = await Pet.find({ ownerId: owner._id, _id: { $in: appointments } });
      for (const pet of ownerPets) {
        if (!results.find((r) => r.pet._id.toString() === pet._id.toString())) {
          results.push({ pet: pet.toSafeObject(), owner: owner.toSafeObject() });
        }
      }
    }

    res.json({ status: 'success', data: { patients: results } });
  } catch (error) {
    next(error);
  }
};

const listClinicPatients = async (req, res, next) => {
  try {
    const clinic = await getClinicForVet(req.user._id);
    if (!clinic) return res.status(403).json({ status: 'error', message: 'Clinic not found' });

    const petIds = await Appointment.find({ clinicId: clinic._id }).distinct('petId');
    const pets = await Pet.find({ _id: { $in: petIds } });
    const owners = await User.find({ _id: { $in: pets.map((p) => p.ownerId) } });
    const ownerMap = Object.fromEntries(owners.map((o) => [o._id.toString(), o]));

    const patients = pets.map((pet) => ({
      pet: pet.toSafeObject(),
      owner: ownerMap[pet.ownerId.toString()]?.toSafeObject?.() ?? ownerMap[pet.ownerId.toString()],
    }));

    res.json({ status: 'success', data: { patients } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTimeline,
  createDiagnosis,
  createPrescription,
  listPrescriptions,
  createReminder,
  listOwnerReminders,
  listOwnerTasks,
  updateTaskStatus,
  uploadDocument,
  listDocuments,
  searchPatients,
  listClinicPatients,
  canAccessPet,
};
