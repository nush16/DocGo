// // Import the Mongoose library
// const mongoose = require("mongoose");

// // Define the Mongoose schema for the "User" entity
// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true }, // Property for storing the email (expects a string)
//   password: { type: String, required: true }, // Property for storing the password (expects a string)
// });

// // Create a Mongoose model named ""User" based on the "UserSchema"
// const User = mongoose.model("User", UserSchema);

// // Export the "User" model to make it accessible from other parts of the application
// module.exports = { User };

const mongoose = require("mongoose");

// Define the Mongoose schema for the "User" entity
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Property for storing the email (expects a string)
  password: { type: String, required: true }, // Property for storing the password (expects a string)
  signUps: [{ type: mongoose.Schema.Types.ObjectId, ref: "SignUp" }], // Reference to the SignUp model
});

// Create a Mongoose model named "User" based on the "UserSchema"
const User = mongoose.model("User", UserSchema);

// Export the "User" model to make it accessible from other parts of the application
module.exports = { User };
