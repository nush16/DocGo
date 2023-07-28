const mongoose = require("mongoose");

// Define the Mongoose schema for the "Staff" entity
const StaffSchema = new mongoose.Schema({
  title: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the "User" model
});

// Create a Mongoose model named "Staff" based on the "StaffSchema"
const Staff = mongoose.model("Staff", StaffSchema);

// Export the "Staff" model to make it accessible from other parts of the application
module.exports = { Staff };
