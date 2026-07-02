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

module.exports = { buildAuthPayload };
