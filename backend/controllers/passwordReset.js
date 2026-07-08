const crypto = require('crypto');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const { sendPasswordResetEmail } = require('../services/email');

const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000;

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const forgotPassword = async (req, res) => {
  const { email } = req.body ?? {};

  if (!email?.trim()) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is required',
    });
  }

  const user = await User.findByEmail(email);

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(token);

    await PasswordReset.deleteMany({ userId: user._id });
    await PasswordReset.create({
      userId: user._id,
      tokenHash,
      expiresAt: new Date(Date.now() + RESET_TOKEN_EXPIRY_MS),
    });

    const resetUrl = `${process.env.FRONTEND_ORIGIN}/reset-password?token=${token}`;

    try {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetUrl,
      });
    } catch (error) {
      console.error('[PASSWORD RESET] Failed to send email:', error.message);
      console.log(`[PASSWORD RESET] Reset link for ${user.email}: ${resetUrl}`);
    }
  }

  res.status(200).json({
    status: 'success',
    message: 'If an account exists for that email, a password reset link has been sent.',
  });
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body ?? {};

    if (!token || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Token and new password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters',
      });
    }

    const tokenHash = hashToken(token);
    const resetRecord = await PasswordReset.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset link',
      });
    }

    const user = await User.findById(resetRecord.userId);
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset link',
      });
    }

    user.password = password;
    await user.save();
    await PasswordReset.deleteMany({ userId: user._id });

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully. You can now sign in.',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
