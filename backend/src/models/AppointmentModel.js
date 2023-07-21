const mongoose = require("mongoose");

// Define the Mongoose schema for the "Appointment" entity
const AppointmentSchema = new mongoose.Schema({
  practioner: String, // Property for storing the doctor (expects a string)
  type: String, // Property for storing the type (expects a string)
  patient: String, // Property for storing the patient name (expects a string)
  time: Number, // Property for storing the time (expects a string)
  date: String, // Property for storing the date (expects a string)
  Note: String, // Property for storing the note (expects a string)
});

// Create a Mongoose model named "Appointment" based on the "AppointmentSchema"
const Appointment = mongoose.model("Appointment", AppointmentSchema);

// Export the "Appointment" model to make it accessible from other parts of the application
module.exports = { Appointment };
