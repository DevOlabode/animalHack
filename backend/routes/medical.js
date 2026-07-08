const express = require('express');
const {
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
} = require('../controllers/medical');
const { isAuthenticated } = require('../middleware/auth');
const { isPetOwner, isVet } = require('../middleware/roles');

const router = express.Router();

router.use(isAuthenticated);

router.get('/pets/:petId/timeline', getTimeline);
router.get('/pets/:petId/prescriptions', listPrescriptions);
router.get('/pets/:petId/documents', listDocuments);
router.post('/pets/:petId/documents', isPetOwner, uploadDocument);

router.post('/diagnoses', isVet, createDiagnosis);
router.post('/prescriptions', isVet, createPrescription);
router.post('/reminders', isVet, createReminder);

router.get('/reminders', isPetOwner, listOwnerReminders);
router.get('/tasks', isPetOwner, listOwnerTasks);
router.patch('/tasks/:id/status', isPetOwner, updateTaskStatus);

router.get('/patients', isVet, listClinicPatients);
router.get('/search/patients', isVet, searchPatients);

module.exports = router;
