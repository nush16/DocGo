const mongoose = require("mongoose");

// Define the Mongoose schema for the "Patient" entity
const PatientSchema = new mongoose.Schema({
  title: String, // Property for storing the title (expects a string)
  first_name: String, // Property for storing the first name (expects a string)
  last_name: String, // Property for storing the last name (expects a string)
  preferred_name: String, // Property for storing the preferred name (expects a string)
  dob: String, // Property for storing the date of birth (expects a string)
  email: String, // Property for storing the email (expects a string)
  phone: Number, // Property for storing the phone (expects a string)
  Note: String, // Property for storing the note (expects a string)
});

// Create a Mongoose model named "Patient" based on the "PatientSchema"
const Patient = mongoose.model("Patient", PatientSchema);

// Export the "Patient"model to make it accessible from other parts of the application
module.exports = { Patient };
