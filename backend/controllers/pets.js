const Pet = require('../models/Pet');
const Clinic = require('../models/Clinic');
const Appointment = require('../models/Appointment');

const MAX_PHOTO_LENGTH = 2_000_000;

const validatePetInput = (body, isUpdate = false) => {
  const {
    name,
    species,
    breed,
    dateOfBirth,
    weight,
    sex,
    microchipNumber,
    allergies,
    medicalConditions,
    emergencyContact,
    photoUrl,
  } = body ?? {};

  if (!isUpdate && (!name?.trim() || !species?.trim() || !breed?.trim() || !dateOfBirth || weight === undefined || !sex || !emergencyContact?.trim())) {
    return 'Name, species, breed, date of birth, weight, sex, and emergency contact are required';
  }

  if (weight !== undefined && (Number.isNaN(Number(weight)) || Number(weight) < 0)) {
    return 'Weight must be a valid positive number';
  }

  if (sex && !['male', 'female', 'unknown'].includes(sex)) {
    return 'Sex must be male, female, or unknown';
  }

  if (dateOfBirth && Number.isNaN(new Date(dateOfBirth).getTime())) {
    return 'Date of birth must be a valid date';
  }

  if (photoUrl && photoUrl.length > MAX_PHOTO_LENGTH) {
    return 'Photo is too large. Please use a smaller image.';
  }

  return null;
};

const listPets = async (req, res, next) => {
  try {
    const pets = await Pet.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: { pets: pets.map((pet) => pet.toSafeObject()) },
    });
  } catch (error) {
    next(error);
  }
};

const getPet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        status: 'error',
        message: 'Pet not found',
      });
    }

    const isOwner = pet.ownerId.toString() === req.user._id.toString();
    let isClinicPatient = false;

    if (req.user.role === 'vet') {
      const clinic = await Clinic.findOne({ userId: req.user._id });
      if (clinic) {
        isClinicPatient = await Appointment.exists({ petId: pet._id, clinicId: clinic._id });
      }
    }

    if (!isOwner && !isClinicPatient) {
      return res.status(404).json({
        status: 'error',
        message: 'Pet not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { pet: pet.toSafeObject() },
    });
  } catch (error) {
    next(error);
  }
};

const createPet = async (req, res, next) => {
  try {
    const validationError = validatePetInput(req.body);
    if (validationError) {
      return res.status(400).json({ status: 'error', message: validationError });
    }

    const pet = await Pet.create({
      ownerId: req.user._id,
      name: req.body.name.trim(),
      species: req.body.species.trim(),
      breed: req.body.breed.trim(),
      dateOfBirth: new Date(req.body.dateOfBirth),
      weight: Number(req.body.weight),
      sex: req.body.sex,
      microchipNumber: req.body.microchipNumber?.trim() ?? '',
      allergies: req.body.allergies?.trim() ?? '',
      medicalConditions: req.body.medicalConditions?.trim() ?? '',
      emergencyContact: req.body.emergencyContact.trim(),
      photoUrl: req.body.photoUrl ?? '',
    });

    res.status(201).json({
      status: 'success',
      message: 'Pet created successfully',
      data: { pet: pet.toSafeObject() },
    });
  } catch (error) {
    next(error);
  }
};

const updatePet = async (req, res, next) => {
  try {
    const validationError = validatePetInput(req.body, true);
    if (validationError) {
      return res.status(400).json({ status: 'error', message: validationError });
    }

    const pet = await Pet.findOne({ _id: req.params.id, ownerId: req.user._id });

    if (!pet) {
      return res.status(404).json({
        status: 'error',
        message: 'Pet not found',
      });
    }

    const fields = [
      'name', 'species', 'breed', 'weight', 'sex',
      'microchipNumber', 'allergies', 'medicalConditions',
      'emergencyContact', 'photoUrl',
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === 'weight') {
          pet.weight = Number(req.body.weight);
        } else if (typeof req.body[field] === 'string') {
          pet[field] = req.body[field].trim();
        } else {
          pet[field] = req.body[field];
        }
      }
    });

    if (req.body.dateOfBirth) {
      pet.dateOfBirth = new Date(req.body.dateOfBirth);
    }

    await pet.save();

    res.status(200).json({
      status: 'success',
      message: 'Pet updated successfully',
      data: { pet: pet.toSafeObject() },
    });
  } catch (error) {
    next(error);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });

    if (!pet) {
      return res.status(404).json({
        status: 'error',
        message: 'Pet not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Pet deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
};
