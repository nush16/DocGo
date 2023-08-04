const mongoose = require("mongoose");

// Define the Mongoose schema for the "Patient" entity
const PatientSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Property for storing the title (expects a string)
  first_name: { type: String, required: true }, // Property for storing the first name (expects a string)
  last_name: { type: String, required: true }, // Property for storing the last name (expects a string)
  gender: { type: String, required: true }, // Property for storing the preferred name (expects a string)
  dob: { type: Date, required: true }, // Property for storing the date of birth (expects a string)
  email: { type: String, unique: true, lowercase: true, required: true }, // Property for storing the email (expects a string)
  phone: { type: String, required: true }, // Property for storing the phone (expects a string)
});

// Create a Mongoose model named "Patient" based on the "PatientSchema"
const Patient = mongoose.model("Patient", PatientSchema);

// Export the "Patient" model to make it accessible from other parts of the application
module.exports = Patient;
