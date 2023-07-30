const Appointment = require("../models/appointment_model");
const User = require("../models/user_model");
const SignUp = require("../models/signup_model");
const Staff = require("../models/staff_model");
const Patient = require("../models/patient_model");

// Controller to create a new appointment
async function createAppointment(request, response) {
  try {
    const newAppointment = await Appointment.create(request.body);
    response.status(201).json(newAppointment);
  } catch (err) {
    response.status(500).json({ error: "Failed to create the appointment" });
  }
}

// Controller to retrieve all appointments
async function getAllAppointments(request, response) {
  try {
    const appointments = await Appointment.find();
    response.status(200).json(appointments);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch appointments" });
  }
}

// Controller to retrieve a single appointment by ID
async function getAppointmentById(request, response) {
  try {
    const appointment = await Appointment.findById(request.params.id);
    if (!appointment) {
      return response.status(404).json({ error: "Appointment not found" });
    }
    response.status(200).json(appointment);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch the appointment" });
  }
}

// Controller to update an appointment by ID
async function updateAppointmentById(request, response) {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return response.status(404).json({ error: "Appointment not found" });
    }
    response.status(200).json(updatedAppointment);
  } catch (err) {
    response.status(500).json({ error: "Failed to update the appointment" });
  }
}

// Controller to delete an appointment by ID
async function deleteAppointmentById(request, response) {
  try {
    const deletedAppointment = await Appointment.findByIdAndRemove(
      request.params.id
    );
    if (!deletedAppointment) {
      return response.status(404).json({ error: "Appointment not found" });
    }
    response.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    response.status(500).json({ error: "Failed to delete the appointment" });
  }
}

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};
