const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  operatingHours: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

clinicSchema.methods.toSafeObject = function () {
  return this.toObject();
};

clinicSchema.statics.createForUser = async function (userId, data) {
  const clinic = new this({ userId, ...data });
  return clinic.save();
};

clinicSchema.statics.findByUserId = async function (userId) {
  return this.findOne({ userId });
};

module.exports = mongoose.model('Clinic', clinicSchema);
