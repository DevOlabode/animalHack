const User = require('../models/User');
const Clinic = require('../models/Clinic');
const { buildAuthPayload } = require('../services/authPayload');

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body ?? {};
    const user = req.user;

    if (!name?.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Name is required',
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail !== user.email) {
      const existing = await User.findByEmail(normalizedEmail);
      if (existing) {
        return res.status(409).json({
          status: 'error',
          message: 'Email is already in use',
        });
      }
      user.email = normalizedEmail;
    }

    user.name = name.trim();

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Current password is required to set a new password',
        });
      }

      const isValid = await user.comparePassword(currentPassword);
      if (!isValid) {
        return res.status(401).json({
          status: 'error',
          message: 'Current password is incorrect',
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          status: 'error',
          message: 'New password must be at least 6 characters',
        });
      }

      user.password = newPassword;
    }

    await user.save();

    const data = await buildAuthPayload(user);
    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateClinicProfile = async (req, res, next) => {
  try {
    if (req.user.role !== 'vet') {
      return res.status(403).json({
        status: 'error',
        message: 'Only clinic accounts can update clinic profiles',
      });
    }

    const clinic = await Clinic.findByUserId(req.user._id);
    if (!clinic) {
      return res.status(404).json({
        status: 'error',
        message: 'Clinic profile not found',
      });
    }

    const {
      contactName,
      loginEmail,
      name,
      description,
      address,
      phone,
      email,
      operatingHours,
      currentPassword,
      newPassword,
    } = req.body ?? {};

    if (!contactName?.trim() || !name?.trim() || !address?.trim() || !phone?.trim() || !operatingHours?.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Contact name, clinic name, address, phone, and operating hours are required',
      });
    }

    if (!email?.trim() || !loginEmail?.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Login email and clinic email are required',
      });
    }

    const normalizedLoginEmail = loginEmail.toLowerCase().trim();
    if (normalizedLoginEmail !== req.user.email) {
      const existing = await User.findByEmail(normalizedLoginEmail);
      if (existing) {
        return res.status(409).json({
          status: 'error',
          message: 'Login email is already in use',
        });
      }
      req.user.email = normalizedLoginEmail;
    }

    req.user.name = contactName.trim();
    clinic.name = name.trim();
    clinic.description = description?.trim() ?? '';
    clinic.address = address.trim();
    clinic.phone = phone.trim();
    clinic.email = email.toLowerCase().trim();
    clinic.operatingHours = operatingHours.trim();

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Current password is required to set a new password',
        });
      }

      const isValid = await req.user.comparePassword(currentPassword);
      if (!isValid) {
        return res.status(401).json({
          status: 'error',
          message: 'Current password is incorrect',
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          status: 'error',
          message: 'New password must be at least 6 characters',
        });
      }

      req.user.password = newPassword;
    }

    await req.user.save();
    await clinic.save();

    const data = await buildAuthPayload(req.user);
    res.status(200).json({
      status: 'success',
      message: 'Clinic profile updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  updateClinicProfile,
};
