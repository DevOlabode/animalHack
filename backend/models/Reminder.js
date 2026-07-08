const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: {
    type: String,
    enum: ['medication', 'vaccination', 'follow_up', 'care_instruction'],
    required: true,
  },
  title: { type: String, required: true, trim: true },
  message: { type: String, default: '', trim: true },
  dueDate: { type: Date, required: true },
  prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  emailSent: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
