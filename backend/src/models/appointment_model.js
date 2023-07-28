const mongoose = require("mongoose");

// Define the Mongoose schema for the "Appointment" entity
const AppointmentSchema = new mongoose.Schema({
  practioner: { type: mongoose.Types.ObjectId, ref: "Staff" }, // Property for storing the doctor (expects a string)
  type: { type: String, required: true }, // Property for storing the type (expects a string)
  patient: { type: mongoose.Types.ObjectId, ref: "Patient" }, // Property for storing the patient name (expects a string)
  time: { type: Number, required: true }, // Property for storing the time (expects a string)
  date: { type: Date, required: true }, // Property for storing the date (expects a string)
  note: { type: String }, // Property for storing the note (expects a string)
});

// Create a Mongoose model named "Appointment" based on the "AppointmentSchema"
const Appointment = mongoose.model("Appointment", AppointmentSchema);

// Export the "Appointment" model to make it accessible from other parts of the application
module.exports = { Appointment };
