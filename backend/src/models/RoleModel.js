// Import the Mongoose library
const mongoose = require("mongoose");

// Define the Mongoose schema for the "Role" entity
const RoleSchema = new mongoose.Schema({
  name: String, // Property for storing the name of the role (expects a string)
  description: String, // Property for storing the description of the role (expects a string)
});

// Create a Mongoose model named "Role" based on the "RoleSchema"
const Role = mongoose.model("Role", RoleSchema);

// Export the "Role" model to make it accessible from other parts of the application
module.exports = { Role };
