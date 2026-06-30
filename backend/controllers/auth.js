const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const signUp = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        status: 'error',
        message: 'Email, password, and name are required'
      });
    }

    const user = new User({ email, password, name, role });
    const token = generateToken(user);
    const safeUser = User.toSafeUser(user);

    await User.save();

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: { user: safeUser, token }
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const isValidPassword = await User.verifyPassword(user, password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user);
    const safeUser = User.toSafeUser(user);

    res.status(200).json({
      status: 'success',
      message: 'Signed in successfully',
      data: { user: safeUser, token }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

module.exports = {
  signUp,
  signIn
};