// const mongoose = require("mongoose");
// const { databaseConnector } = require("./database");

// // Import the models that we'll seed, so that
// // we can do things like Role.insertMany()
// const { Role } = require("./models/RoleModel");
// const { User } = require("./models/UserModel");

// // Make sure this file can read environment variables.
// const dotenv = require("dotenv");
// dotenv.config();

// // Create some raw data for the Roles collection,
// // obeying the needed fields from the Role schema.
// const roles = [
//   {
//     name: "regular",
//     description:
//       "A regular user can view, create and read data. They can edit and delete only their own data.",
//   },
//   {
//     name: "admin",
//     description:
//       "An admin user has full access and permissions to do anything and everything within this API.",
//   },
//   {
//     name: "banned",
//     description: "A banned user can read data, but cannot do anything else.",
//   },
// ];

// // To fill in after creating user data encryption functionality.
// const users = [];

// // Connect to the database.
// var databaseURL = "";
// switch (process.env.NODE_ENV.toLowerCase()) {
//   case "test":
//     databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-test";
//     break;
//   case "development":
//     databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-dev";
//     break;
//   case "production":
//     databaseURL = process.env.DATABASE_URL;
//     break;
//   default:
//     console.error(
//       "Incorrect JS environment specified, database will not be connected."
//     );
//     break;
// }

// // This functionality is a big promise-then chain.
// // This is because it requires some async functionality,
// // and that doesn't work without being wrapped in a function.
// // Since .then(callback) lets us create functions as callbacks,
// // we can just do stuff in a nice .then chain.
// databaseConnector(databaseURL)
//   .then(() => {
//     console.log("Database connected successfully!");
//   })
//   .catch((error) => {
//     console.log(`
//     Some error occurred connecting to the database! It was:
//     ${error}
//     `);
//   })
//   .then(async () => {
//     if (process.env.WIPE == "true") {
//       // Get the names of all collections in the DB.
//       const collections = await mongoose.connection.db
//         .listCollections()
//         .toArray();

//       // Empty the data and collections from the DB so that they no longer exist.
//       collections
//         .map((collection) => collection.name)
//         .forEach(async (collectionName) => {
//           mongoose.connection.db.dropCollection(collectionName);
//         });
//       console.log("Old DB data deleted.");
//     }
//   })
//   .then(async () => {
//     // Add new data into the database.
//     await Role.insertMany(roles);

//     console.log("New DB data created.");
//   })
//   .then(() => {
//     // Disconnect from the database.
//     mongoose.connection.close();
//     console.log("DB seed connection closed.");
//   });

// Import the Mongoose models for User and SignUp
const mongoose = require("mongoose");
const { User } = require("./models/user_model");
const { SignUp } = require("./models/signup_model");

// Function to seed data into the database
const seedData = async () => {
  try {
    // Seed Users
    const users = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
    ];
    const seededUsers = await User.create(users);

    // Seed SignUps
    const signUps = [
      {
        first_name: "John",
        last_name: "Doe",
        business_name: "ABC Corp",
        email: "john.doe@example.com",
        phone: "1234567890",
        user: seededUsers[0]._id, // Reference the first user for the SignUp
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        business_name: "XYZ Inc",
        email: "jane.smith@example.com",
        phone: "9876543210",
        user: seededUsers[1]._id, // Reference the second user for the SignUp
      },
    ];
    await SignUp.create(signUps);

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the Mongoose connection after seeding the data
    mongoose.connection.close();
  }
};

module.exports = seedData;
