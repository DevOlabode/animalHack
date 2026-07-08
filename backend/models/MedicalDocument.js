const mongoose = require('mongoose');

const medicalDocumentSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  documentType: {
    type: String,
    enum: ['vaccination', 'lab', 'blood', 'xray', 'referral', 'other'],
    default: 'other',
  },
  fileType: {
    type: String,
    enum: ['pdf', 'jpg', 'png'],
    required: true,
  },
  fileUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('MedicalDocument', medicalDocumentSchema);
