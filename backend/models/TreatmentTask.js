const mongoose = require('mongoose');

const treatmentTaskSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reminderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' },
  prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  status: {
    type: String,
    enum: ['completed', 'missed', 'in_progress'],
    default: 'in_progress',
  },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('TreatmentTask', treatmentTaskSchema);
