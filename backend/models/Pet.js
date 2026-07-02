const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  species: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'unknown'],
    required: true,
  },
  microchipNumber: {
    type: String,
    trim: true,
    default: '',
  },
  allergies: {
    type: String,
    trim: true,
    default: '',
  },
  medicalConditions: {
    type: String,
    trim: true,
    default: '',
  },
  emergencyContact: {
    type: String,
    required: true,
    trim: true,
  },
  photoUrl: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

petSchema.methods.calculateAge = function () {
  const today = new Date();
  const birth = new Date(this.dateOfBirth);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 1) {
    return months <= 1 ? `${Math.max(months, 0)} month${months === 1 ? '' : 's'}` : `${months} months`;
  }

  if (months === 0) {
    return `${years} year${years === 1 ? '' : 's'}`;
  }

  return `${years} year${years === 1 ? '' : 's'}, ${months} month${months === 1 ? '' : 's'}`;
};

petSchema.methods.toSafeObject = function () {
  const pet = this.toObject();
  pet.age = this.calculateAge();
  return pet;
};

module.exports = mongoose.model('Pet', petSchema);
