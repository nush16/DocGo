// Make the .env data ready for use.
const dotenv = require("dotenv");
dotenv.config();

// Import the Express package and configure some needed data.
const express = require("express");
const mongoose = require("mongoose");
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

// Initialize the variable to store the database URL
var databaseURL = "";

// Determine the appropriate database URL based on the environment
switch (process.env.NODE_ENV.toLowerCase()) {
  case "test":
    // If the environment is "test", use the corresponding test database URL
    databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-test";
    break;
  case "development":
    // If the environment is "development", use the corresponding development database URL
    databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-dev";
    break;
  case "production":
    // If the environment is "production", use the database URL provided via the environment variable
    databaseURL = process.env.DATABASE_URL;
    break;
  default:
    // If an incorrect environment is specified, log an error and don't connect to the database
    console.error(
      "Incorrect JS environment specified, database will not be connected."
    );
    break;
}

// Import the databaseConnector function from the './database' module
const { databaseConnector } = require("./database");

// Connect to the database using the determined URL
databaseConnector(databaseURL)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    // If there's an error connecting to the database, log the error
    console.log(`
    Some error occurred connecting to the database! It was: 
    ${error}
    `);
  });

// API endpoint to retrieve database health information
app.get("/databaseHealth", (request, response) => {
  // Get various details about the database connection
  let databaseState = mongoose.connection.readyState;
  let databaseName = mongoose.connection.name;
  let databaseModels = mongoose.connection.modelNames();
  let databaseHost = mongoose.connection.host;

  // Respond with a JSON containing the database health information
  response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost,
  });
});

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
