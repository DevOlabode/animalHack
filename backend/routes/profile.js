const express = require('express');
const { updateProfile, updateClinicProfile } = require('../controllers/profile');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.put('/', isAuthenticated, updateProfile);
router.put('/clinic', isAuthenticated, updateClinicProfile);

module.exports = router;
