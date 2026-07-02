const isPetOwner = (req, res, next) => {
  const role = req.user?.role;

  if (role === 'pet_owner' || role === 'owner') {
    return next();
  }

  return res.status(403).json({
    status: 'error',
    message: 'Only pet owners can manage pets',
  });
};

module.exports = { isPetOwner };
