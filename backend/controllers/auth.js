const passport = require('../config/passport');
const User = require('../models/User');
const Clinic = require('../models/Clinic');

const buildAuthPayload = async (user) => {
  const payload = { user: User.toSafeUser(user) };

  if (user.role === 'vet') {
    const clinic = await Clinic.findByUserId(user._id);
    if (clinic) {
      payload.clinic = clinic.toSafeObject();
    }
  }

  return payload;
};

const signUpPetOwner = async (req, res, next) => {
  try {
    const { email, password, name } = req.body ?? {};

    if (!email || !password || !name) {
      return res.status(400).json({
        status: 'error',
        message: 'Email, password, and name are required',
      });
    }

    const user = await User.create({
      email,
      password,
      name,
      role: 'pet_owner',
    });

    req.login(user, async (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      const data = await buildAuthPayload(req.user);
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data,
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

const signUpClinic = async (req, res, next) => {
  let user;

  try {
    const { email, password, name, clinic } = req.body ?? {};
    const {
      name: clinicName,
      description,
      address,
      phone,
      email: clinicEmail,
      operatingHours,
    } = clinic ?? {};

    if (!email || !password || !name) {
      return res.status(400).json({
        status: 'error',
        message: 'Contact name, email, and password are required',
      });
    }

    if (!clinicName || !address || !phone || !operatingHours) {
      return res.status(400).json({
        status: 'error',
        message: 'Clinic name, address, phone, and operating hours are required',
      });
    }

    user = await User.create({
      email,
      password,
      name,
      role: 'vet',
    });

    await Clinic.createForUser(user._id, {
      name: clinicName,
      description: description ?? '',
      address,
      phone,
      email: clinicEmail || email,
      operatingHours,
    });

    req.login(user, async (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      const data = await buildAuthPayload(req.user);
      res.status(201).json({
        status: 'success',
        message: 'Clinic registered successfully',
        data,
      });
    });
  } catch (error) {
    if (user?._id) {
      await User.findByIdAndDelete(user._id);
      await Clinic.deleteOne({ userId: user._id });
    }

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

    req.login(user, async (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      const data = await buildAuthPayload(req.user);
      res.status(200).json({
        status: 'success',
        message: 'Signed in successfully',
        data,
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

const getCurrentUser = async (req, res) => {
  const data = await buildAuthPayload(req.user);
  res.status(200).json({
    status: 'success',
    data,
  });
};

module.exports = {
  signUpPetOwner,
  signUpClinic,
  signIn,
  logout,
  getCurrentUser,
};
