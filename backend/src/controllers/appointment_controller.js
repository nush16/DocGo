const { Appointment } = require("../models/appointment_model");

// Controller to create a new appointment
async function createAppointment(req, res) {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create the appointment" });
  }
}

// Controller to retrieve all appointments
async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
}

// Controller to retrieve a single appointment by ID
async function getAppointmentById(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the appointment" });
  }
}

// Controller to update an appointment by ID
async function updateAppointmentById(req, res) {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update the appointment" });
  }
}

// Controller to delete an appointment by ID
async function deleteAppointmentById(req, res) {
  try {
    const deletedAppointment = await Appointment.findByIdAndRemove(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the appointment" });
  }
}

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};
