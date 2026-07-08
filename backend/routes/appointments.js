const express = require('express');
const {
  listOwnerAppointments,
  listClinicAppointments,
  bookAppointment,
  updateAppointmentStatus,
} = require('../controllers/appointments');
const { isAuthenticated } = require('../middleware/auth');
const { isPetOwner, isVet } = require('../middleware/roles');

const router = express.Router();

router.use(isAuthenticated);

router.get('/owner', isPetOwner, listOwnerAppointments);
router.get('/clinic', isVet, listClinicAppointments);
router.post('/', isPetOwner, bookAppointment);
router.patch('/:id/status', updateAppointmentStatus);

module.exports = router;
