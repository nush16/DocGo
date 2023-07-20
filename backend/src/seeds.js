// Import Mongoose library
const mongoose = require("mongoose");

// Import the databaseConnector function from './database' module
const { databaseConnector } = require("./database");

// Import the models
const { Role } = require("./models/RoleModel");
const { User } = require("./models/UserModel");
const { Doctor } = require("./models/DoctorModel");
const { Patient } = require("./models/PatientModel");

// Load environment variables from a .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// Data for the 'user' collection to be inserted
const roles = [
  {
    name: "admin",
    description:
      "An admin user has full access and permissions to do anything and everything within this API.",
  },
  {
    name: "doctor",
    description: "A doctor user can create, read, update and delete data",
  },
];

// To fill in after creating user data encryption functionality.
const users = [];

// To fill in after creating users successfully.
const doctors = [];

const patients = [];

// Connect to the database.
var databaseURL = "";
switch (process.env.NODE_ENV.toLowerCase()) {
  case "test":
    databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-test";
    break;
  case "development":
    databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-dev";
    break;
  case "production":
    databaseURL = process.env.DATABASE_URL;
    break;
  default:
    console.error(
      "Incorrect JS environment specified, database will not be connected."
    );
    break;
}

// This functionality is a big promise-then chain.
// This is because it requires some async functionality,
// and that doesn't work without being wrapped in a function.
// Since .then(callback) lets us create functions as callbacks,
// we can just do stuff in a nice .then chain.
databaseConnector(databaseURL)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log(`
    Some error occurred connecting to the database! It was: 
    ${error}
    `);
  })
  .then(async () => {
    if (process.env.WIPE == "true") {
      // Get the names of all collections in the DB.
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();

      // Empty the data and collections from the DB so that they no longer exist.
      collections
        .map((collection) => collection.name)
        .forEach(async (collectionName) => {
          mongoose.connection.db.dropCollection(collectionName);
        });
      console.log("Old DB data deleted.");
    }
  })
  .then(async () => {
    // Add new data into the database.
    await Role.insertMany(roles);

    console.log("New DB data created.");
  })
  .then(() => {
    // Disconnect from the database.
    mongoose.connection.close();
    console.log("DB seed connection closed.");
  });
