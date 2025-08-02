module.exports = (requiredRole) => {
  return (req, res, next) => {
    
    if (req.body && req.body.role === requiredRole) {
      next();
    } else {
      return res.status(403).json({ msg: 'Access denied' });
    }
  };
};