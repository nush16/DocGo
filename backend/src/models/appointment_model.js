const mongoose = require("mongoose");

// Define the Mongoose schema for the "Appointment" entity
const AppointmentSchema = new mongoose.Schema({
  practioner: { type: String, required: true }, // Property for storing the doctor (expects a string)
  type: { type: String, required: true }, // Property for storing the type (expects a string)
  patient: { type: String, required: true }, // Property for storing the patient name (expects a string)
  time: { type: Number, required: true }, // Property for storing the time (expects a string)
  date: { type: Date, required: true }, // Property for storing the date (expects a string)
  Note: { type: String }, // Property for storing the note (expects a string)
});

// Create a Mongoose model named "Appointment" based on the "AppointmentSchema"
const Appointment = mongoose.model("Appointment", AppointmentSchema);

// Export the "Appointment" model to make it accessible from other parts of the application
module.exports = { Appointment };
