// Make the .env data ready for use.
const dotenv = require("dotenv");
dotenv.config();

// Import the Express package and configure some needed data.
const express = require("express");
const app = express();

// If no process.env.X is found, assign a default value instead.
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

// Configure some basic Helmet settings on the server instance.
const helmet = require("helmet");
app.use(helmet());

// Configure permittedCrossDomainPolicies for additional security.
app.use(helmet.permittedCrossDomainPolicies());

// Configure referrerPolicy to control referrer information.
app.use(helmet.referrerPolicy());

// Configure contentSecurityPolicy to prevent various types of attacks.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow resources to be loaded from the same origin only.
    },
  })
);

// Configure CORS (Cross-Origin Resource Sharing) to allow specific origins.
const cors = require("cors");
var corsOptions = {
  origin: ["http://localhost:5000", "https://deployedApp.com"], // Whitelist of allowed origins.
  optionsSuccessStatus: 200, // Return 200 OK status for preflight requests.
};
app.use(cors(corsOptions));

// Configure some API-friendly request data formatting.
app.use(express.json()); // Parse JSON request bodies.
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies.

// Add a route just to make sure things work.
// This path is the server API's "homepage".
app.get("/", (request, response) => {
  response.json({
    message: "Hello world!",
  });
});

// Handle requests for unknown routes.
// This will be triggered if no other route matches the requested URL.
app.get("*", (request, response) => {
  response.status(404).json({
    message: "No route with that path found!",
    attemptedPath: request.path, // Include the attempted path in the response.
  });
});

// Export everything needed to run the server.
module.exports = {
  HOST,
  PORT,
  app,
};
