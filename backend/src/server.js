// // Load environment variables from .env file
// require('dotenv').config();
// console.log(process.env);

// // Import the Express package and create the app instance
// const express = require('express');
// const app = express();

// // Import and configure Mongoose for MongoDB
// const mongoose = require('mongoose');

// // Set default values for HOST and PORT from environment variables, if not specified
// const HOST = process.env.HOST || '0.0.0.0';
// const PORT = process.env.PORT || 3001;

// // Helmet middleware for enhancing server security
// const helmet = require('helmet');
// app.use(helmet());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//     },
//   })
// );

// // CORS middleware for handling cross-origin requests
// const cors = require('cors');
// const corsOptions = {
//   origin: [
//     'http://localhost:3000', // Allow requests from local frontend
//     'https://docgo2.netlify.app', // Allow requests from deployed frontend
//     'http://35.201.24.206:3001' // Allow requests from your backend
//   ],
//   optionsSuccessStatus: 200, // Set the HTTP status code for successful CORS preflight requests
// };
// app.use(cors(corsOptions));

// // Middleware to parse request data as JSON and URL-encoded
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// async function databaseConnector() {
//   const databaseURL = process.env.DATABASE_URL;
//   console.log('Database URL:', databaseURL); // Add this line for debugging

//   try {
//     await mongoose.connect(databaseURL);
//     console.log('Connected to the database successfully!'); // Add this line for debugging
//   } catch (error) {
//     console.error('Error occurred connecting to the database:', error);
//   }
// }

// databaseConnector();

// // Route to check the health of the database connection
// app.get('/databaseHealth', (request, response) => {
//   let databaseState = mongoose.connection.readyState;
//   let databaseName = mongoose.connection.name;
//   let databaseModels = mongoose.connection.modelNames();
//   let databaseHost = mongoose.connection.host;

//   response.json({
//     readyState: databaseState,
//     dbName: databaseName,
//     dbModels: databaseModels,
//     dbHost: databaseHost,
//   });
// });

// // Route for the homepage
// app.get('/', (request, response) => {
//   response.json({
//     message: 'Hello world!',
//   });
// });

// Get .env
const dotenv = require("dotenv");
dotenv.config();

// Import express and initialize
const express = require("express");
const app = express();

// Configure host and port & provide default values
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3001;

// Import mongoose
const mongoose = require("mongoose");

// Configure helmet
const helmet = require("helmet");
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

// Configure CORS
const cors = require("cors");
var corsOptions = {
  origin: ["http://localhost:3001", "https://docgo2.netlify.app", ""],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Add axios
const axios = require("axios");

// Enable JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set db url
var databaseURL = "";
switch (process.env.NODE_ENV.toLowerCase()) {
  case "test":
    databaseURL = "mongodb://localhost:27017/docgo_db_test"; // Test database URL
    break;
  case "development":
    databaseURL = "mongodb://localhost:27017/docgo_db"; // Development database URL
    break;
  case "production":
    databaseURL = process.env.DATABASE_URL; // Production database URL
    break;
  default:
    console.error(
      "Incorrect JS environment specified, database will not be connected."
    );
    break;
}

// Route to check the health of the database connection
app.get("/databaseHealth", (request, response) => {
  let databaseState = mongoose.connection.readyState;
  let databaseName = mongoose.connection.name;
  let databaseModels = mongoose.connection.modelNames();
  let databaseHost = mongoose.connection.host;

  response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost,
  });
});

// Connect to the db
async function dbConnect() {
  try {
    await mongoose.connect(databaseURL);
    console.log("Database connected!");
  } catch (error) {
    console.log(`dbConnect failed, error:`, error);
  }
}

dbConnect();

// Import and setup JWT middleware for authentication
const jwtMiddleware = require("./middlewares/auth.js");
// app.use(jwtMiddleware); // Removed the extra function call

// Import the user router and setup its routes
const userRouter = require("./routes/user_router");
app.use("/", userRouter);

// Import and setup patient router
const patientRouter = require("./routes/patient_router");
app.use("/patients", patientRouter);

// Import and setup appointment router
const appointmentRouter = require("./routes/appointment_router");
app.use("/appointments", appointmentRouter);

// Route for handling 404 errors (no route found)
app.use("*", (request, response) => {
  response.status(404).json({
    message: "No route with that path found!",
    attemptedPath: request.path,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export necessary data to run the server
module.exports = {
  HOST,
  PORT,
  app,
};
