const isPetOwner = (req, res, next) => {
  const role = req.user?.role;
  if (role === 'pet_owner' || role === 'owner') return next();
  return res.status(403).json({ status: 'error', message: 'Only pet owners can access this resource' });
};

const isVet = (req, res, next) => {
  if (req.user?.role === 'vet') return next();
  return res.status(403).json({ status: 'error', message: 'Only veterinary clinics can access this resource' });
};

module.exports = { isPetOwner, isVet };
