const passport = require('../config/passport');
const User = require('../models/User');

const signUp = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body ?? {};

    if (!email || !password || !name) {
      return res.status(400).json({
        status: 'error',
        message: 'Email, password, and name are required',
      });
    }

    const user = await User.create({ email, password, name, role });

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: { user: User.toSafeUser(req.user) },
      });
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({
        status: 'error',
        message: 'User with this email already exists',
      });
    }

    next(error);
  }
};

const signIn = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: info?.message || 'Invalid email or password',
      });
    }

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      res.status(200).json({
        status: 'success',
        message: 'Signed in successfully',
        data: { user: User.toSafeUser(req.user) },
      });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((logoutError) => {
    if (logoutError) {
      return next(logoutError);
    }

    req.session.destroy((destroyError) => {
      if (destroyError) {
        return next(destroyError);
      }

      res.clearCookie('connect.sid');
      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
      });
    });
  });
};

const getCurrentUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { user: User.toSafeUser(req.user) },
  });
};

module.exports = {
  signUp,
  signIn,
  logout,
  getCurrentUser,
};
