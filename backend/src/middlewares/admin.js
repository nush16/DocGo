const adminCheck = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized.' });
    }
  };
  
  module.exports = adminCheck;
  