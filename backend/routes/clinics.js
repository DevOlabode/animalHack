const express = require('express');
const { listClinics, getClinic, getClinicSlots } = require('../controllers/clinics');

const router = express.Router();

router.get('/', listClinics);
router.get('/:id', getClinic);
router.get('/:id/slots', getClinicSlots);

module.exports = router;
