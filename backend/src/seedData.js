// const mongoose = require("mongoose");
// const { databaseConnector } = require("./database");

// // Import the models that we'll seed
// const { User } = require("./models/user_model");
// const { SignUp } = require("./models/signup_model");

// // Make sure this file can read environment variables.
// const dotenv = require("dotenv");
// dotenv.config();

// const signUps = [
//   {
//     first_name: "Tom",
//     last_name: "Brady",
//     business_name: "ABC Clinic",
//     email: "Tom.Brady@example.com",
//     phone: "1234567890",
//   },
//   {
//     first_name: "Kate",
//     last_name: "Lam",
//     business_name: "ABC Clinic",
//     email: "Kate.Lam@example.com",
//     phone: "9876543210",
//   },
// ];

// const users = [
//   {
//     email: "Tom.Brady@example.com",
//     password: "password1",
//     signUp: signUps[0]._id,
//   }, // Reference the first signup for the User
//   {
//     email: "Kate.Lam@example.com",
//     password: "password2",
//     signUp: signUps[1]._id,
//   }, // Reference the second signup for the User
// ];

// // Connect to the database.
// var databaseURL = "";
// switch (process.env.NODE_ENV.toLowerCase()) {
//   case "test":
//     databaseURL = "mongodb://localhost:27017/docgo_db_test";
//     break;
//   case "development":
//     databaseURL = "mongodb://localhost:27017/docgo_db";
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
//     await SignUp.insertMany(signUps);
//     await User.insertMany(users);

//     console.log("New DB data created.");
//   })
//   .then(() => {
//     // Disconnect from the database.
//     mongoose.connection.close();
//     console.log("DB seed connection closed.");
//   });
