const mongoose = require('mongoose');
const Appointment = require("../models/appointment_model");

// Controller function to create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { practitioner, type, patient, appointmentDateTime, note } = req.body;
    const newAppointment = await Appointment.create({
      practitioner,
      type,
      patient,
      appointmentDateTime,
      note
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating an appointment:', error);
    res.status(500).json({ error: 'Error creating an appointment.' });
  }
};

// Controller function to get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('practitioner').populate('patient');
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments.' });
  }
};

// Controller function to get an appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: 'Invalid appointment ID.' });
    }

    const appointment = await Appointment.findById(appointmentId).populate('practitioner').populate('patient');

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Error fetching appointment.' });
  }
};

// Controller function to update an appointment by ID
const updateAppointmentById = async (req, res) => {
  try {
    const { practitioner, type, patient, appointmentDateTime, note } = req.body;
    const appointmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: 'Invalid appointment ID.' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { practitioner, type, patient, appointmentDateTime, note },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Error updating appointment.' });
  }
};

// Controller function to delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: 'Invalid appointment ID.' });
    }

    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully.' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Error deleting appointment.' });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById
};
