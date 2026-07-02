const express = require('express');
const { signUp, signIn, logout, getCurrentUser } = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, getCurrentUser);

module.exports = router;
