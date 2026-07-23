const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true, trim: true, minlength: 3, maxlength: 500 },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  cancellationReason: { type: String, trim: true, maxlength: 500, default: '' },
  cancelledBy: {
    type: String,
    enum: ['owner', 'clinic'],
  },
}, { timestamps: true });

appointmentSchema.index({ clinicId: 1, date: 1, time: 1, status: 1 });
appointmentSchema.index({ ownerId: 1, date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
