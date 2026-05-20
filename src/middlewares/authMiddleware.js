const authMiddleware = (req, res, next) => {

  // Fake authentication example
  const isLoggedIn = true;

  if (!isLoggedIn) {

    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    });

  }

  next();

};

module.exports = authMiddleware;
