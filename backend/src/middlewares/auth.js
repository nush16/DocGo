// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  // Get the Authorization header from the incoming request
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (authHeader) {
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key stored in environment variables
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      // console.log(user); // Log the user
      // console.error(err); // Log any error
      // If the token is invalid or has expired, return a 403 status
      if (err) {
        return res.sendStatus(403);
      }

      // Attach the user information to the request object
      req.user = user;
      // Proceed to the next middleware function or route handler
      next();
    });
  } else {
    // If there is no Authorization header, return a 401 status
    res.sendStatus(401);
  }
};


// Export the middleware function
module.exports = authenticateJWT;
