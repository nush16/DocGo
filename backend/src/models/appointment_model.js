const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  type: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true }, // Single patient for each appointment
  appointmentDateTime: { type: Date, required: true }, // Combined date and time field
  note: { type: String }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;