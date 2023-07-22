const { Appointment } = require("../models/appointment_model");

// Controller to create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { practioner, type, patient, time, date, Note } = req.body;

    // Create a new appointment object based on the Appointment model
    const newAppointment = new Appointment({
      practioner,
      type,
      patient,
      time,
      date,
      Note,
    });

    // Save the appointment to the database
    await newAppointment.save();

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "practioner patient"
    );

    return res.json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to get a single appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Find the appointment by ID in the database
    const appointment = await Appointment.findById(appointmentId).populate(
      "practioner patient"
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    return res.json({ appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to update an existing appointment
const updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { practioner, type, patient, time, date, Note } = req.body;

    // Find the appointment by ID in the database
    let appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update the appointment properties
    appointment.practioner = practioner;
    appointment.type = type;
    appointment.patient = patient;
    appointment.time = time;
    appointment.date = date;
    appointment.Note = Note;

    // Save the updated appointment to the database
    appointment = await appointment.save();

    return res.json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to delete an appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Find the appointment by ID in the database
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Delete the appointment from the database
    await appointment.remove();

    return res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
