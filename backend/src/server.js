// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Import the Express package and create the app instance
const express = require("express");
const app = express();

// Set default values for HOST and PORT from environment variables, if not specified
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3001;

// Helmet middleware for enhancing server security
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

// CORS middleware for handling cross-origin requests
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000"], // Allow requests from this origin
  optionsSuccessStatus: 200, // Set the HTTP status code for successful CORS preflight requests
};
app.use(cors(corsOptions));

// Middleware to parse request data as JSON and URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and configure Mongoose for MongoDB
const mongoose = require("mongoose");
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
const { databaseConnector } = require("./database");
databaseConnector(databaseURL)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log(`
    Some error occurred connecting to the database! It was: 
    ${error}
    `);
  });

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

// app.get("/databaseDump", async (request, response) => {
//   // Set up an object to store our data.
//   const dumpContainer = {};

//   // Get the names of all collections in the DB.
//   var collections = await mongoose.connection.db.listCollections().toArray();
//   collections = collections.map((collection) => collection.name);

//   // For each collection, get all their data and add it to the dumpContainer.
//   for (const collectionName of collections) {
//     let collectionData = await mongoose.connection.db
//       .collection(collectionName)
//       .find({})
//       .toArray();
//     dumpContainer[collectionName] = collectionData;
//   }

//   // Confirm in the terminal that the server is returning the right data.
//   // With pretty formatting too, via JSON.stringify(value, null, spacing for indentation).
//   console.log(
//     "Dumping all of this data to the client: \n" +
//       JSON.stringify(dumpContainer, null, 4)
//   );

//   // Return the big data object.
//   response.json({
//     data: dumpContainer,
//   });
// });

// Route for the homepage
app.get("/", (request, response) => {
  response.json({
    message: "Hello world!",
  });
});

// Import the signup router
const signupRouter = require("./routes/signup_router");
app.use("/", signupRouter);

// Import the user router
const userRouter = require("./routes/user_router");
app.use("/", userRouter);

// Import the staff router
const staffRouter = require("./routes/staff_router");
app.use("/", staffRouter);

// Import the appointment router
const appointmentRouter = require("./routes/appointment_router");
app.use("/", appointmentRouter);

// Import the patient router
const patientRouter = require("./routes/patient_router");
app.use("/", patientRouter);

// Route for handling 404 errors (no route found)
app.get("*", (request, response) => {
  response.status(404).json({
    message: "No route with that path found!",
    attemptedPath: request.path,
  });
});

// Export necessary data to run the server
module.exports = {
  HOST,
  PORT,
  app,
};
