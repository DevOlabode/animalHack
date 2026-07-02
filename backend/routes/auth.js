const express = require('express');
const {
  signUpPetOwner,
  signUpClinic,
  signIn,
  logout,
  getCurrentUser,
} = require('../controllers/auth');
const { forgotPassword, resetPassword } = require('../controllers/passwordReset');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signUpPetOwner);
router.post('/signup/clinic', signUpClinic);
router.post('/signin', signIn);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, getCurrentUser);

module.exports = router;
