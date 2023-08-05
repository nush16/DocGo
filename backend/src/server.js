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
