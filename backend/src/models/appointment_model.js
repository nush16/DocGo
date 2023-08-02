const mongoose = require("mongoose");

//const AppointmentType = Object.freeze({
//    FirstAppointment: "First Appointment",
//    StandardAppointment: "Standard Appointment",
//    LongAppointment: "Long Appointment",
//    FollowUpAppointment: "Follow up Appointment",
//});

const AppointmentSchema = new mongoose.Schema({
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  type: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true }, // Single patient for each appointment
  startTime: { type: Date, required: true }, // Start time of the appointment
  endTime: { type: Date, required: true }, // End time of the appointment
  note: { type: String }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = {
    Appointment,
};
