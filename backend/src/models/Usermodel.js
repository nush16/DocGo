// Import the Mongoose library
const mongoose = require("mongoose");

// Define the Mongoose schema for the "User" entity
const UserSchema = new mongoose.Schema({
  email: String, // Property for storing the email (expects a string)
  password: String, // Property for storing the password (expects a string)
  role: { type: mongoose.Types.ObjectId, ref: "Role" },
});

// Create a Mongoose model named ""User" based on the "UserSchema"
const User = mongoose.model("User", UserSchema);

// Export the "User" model to make it accessible from other parts of the application
module.exports = { User };
