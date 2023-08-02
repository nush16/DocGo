const { Appointment } = require('../models/appointment_model');
const User = require('../models/user_model');
const mongoose = require('mongoose');

// Create a new appointment
const createAppointment = async (req, res) => {
  const { practitioner, type, patient, startTime, endTime, note } = req.body;

  if (!mongoose.Types.ObjectId.isValid(practitioner)) {
    return res.status(400).json({ error: 'Invalid input: practitioner ID is not valid.' });
  }

  if (!mongoose.Types.ObjectId.isValid(patient)) {
    return res.status(400).json({ error: 'Invalid input: patient ID is not valid.' });
  }

  const user = await User.findById(practitioner);
  if (!user || !user.isPractitioner) {
    return res.status(400).json({ error: 'Invalid practitioner.' });
  }

  try {
    const newAppointment = new Appointment({
      practitioner,
      type,
      patient,
      startTime,
      endTime,
      note
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Error creating appointment.' });
  }
};


// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('practitioner patient', '-password');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments.' });
  }
};

// Get an appointment by ID
const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid appointment ID.' });
  }

  try {
    const appointment = await Appointment.findById(id).populate('practitioner patient', '-password');
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointment.' });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { practitioner, type, patient, startTime, endTime, note } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id) ||
      (practitioner && !mongoose.Types.ObjectId.isValid(practitioner)) || 
      (patient && !mongoose.Types.ObjectId.isValid(patient))) {
    return res.status(400).json({ error: 'Invalid input.' });
  }

  if (practitioner) {
    const user = await User.findById(practitioner);
    if (!user || !user.isPractitioner) {
      return res.status(400).json({ error: 'Invalid practitioner.' });
    }
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(id, { practitioner, type, patient, startTime, endTime, note }, { new: true }).populate('practitioner patient', '-password');
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating appointment.' });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid appointment ID.' });
  }

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting appointment.' });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};
