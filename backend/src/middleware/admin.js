const adminAuth = (req, res, next) => {
    // Assume user is added to req in previous authentication middleware
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "This operation requires admin rights." });
    }
    next();
  };