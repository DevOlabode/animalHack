const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  diagnosisId: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis' },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicationName: { type: String, required: true, trim: true },
  dosage: { type: String, required: true, trim: true },
  frequency: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  instructions: { type: String, default: '', trim: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
