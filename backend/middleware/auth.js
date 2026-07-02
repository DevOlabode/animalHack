const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    status: 'error',
    message: 'Not authenticated',
  });
};

module.exports = { isAuthenticated };
