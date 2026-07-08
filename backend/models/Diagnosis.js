const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  diagnosis: { type: String, required: true, trim: true },
  clinicalNotes: { type: String, default: '', trim: true },
  treatmentPlan: { type: String, default: '', trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Diagnosis', diagnosisSchema);
