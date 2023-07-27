const mongoose = require("mongoose");

// Define the Mongoose schema for the "Doctor" entity
const DoctorSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Property for storing the title (expects a string)
  first_name: { type: String, required: true }, // Property for storing the first name (expects a string)
  last_name: { type: String, required: true }, // Property for storing the last name (expects a string)
  email: { type: String, required: true }, // Property for storing the email (expects a string)
});

// Create a Mongoose model named "Doctor" based on the "DoctorSchema"
const Doctor = mongoose.model("Doctor", DoctorSchema);

// Export the "Doctor" model to make it accessible from other parts of the application
module.exports = { Doctor };
