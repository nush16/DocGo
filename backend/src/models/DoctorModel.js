const mongoose = require("mongoose");

// Define the Mongoose schema for the "Doctor" entity
const PatientSchema = new mongoose.Schema({
  title: String, // Property for storing the title (expects a string)
  first_name: String, // Property for storing the first name (expects a string)
  last_name: String, // Property for storing the last name (expects a string)
  email: String, // Property for storing the email (expects a string)
});

// Create a Mongoose model named "Doctor" based on the "DoctorSchema"
const Patient = mongoose.model("Patient", PatientSchema);

// Export the "Doctor" model to make it accessible from other parts of the application
module.exports = { Patient };
