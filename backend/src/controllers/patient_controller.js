const { Patient } = require("../models/patient_model");

// Controller to create a new patient
const createPatient = async (req, res) => {
  try {
    const {
      title,
      first_name,
      last_name,
      preferred_name,
      dob,
      email,
      phone,
      Note,
    } = req.body;

    // Create a new patient object based on the Patient model
    const newPatient = new Patient({
      title,
      first_name,
      last_name,
      preferred_name,
      dob,
      email,
      phone,
      Note,
    });

    // Save the patient to the database
    await newPatient.save();

    return res
      .status(201)
      .json({ message: "Patient created successfully", patient: newPatient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    return res.json({ patients });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to get a single patient by ID
const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Find the patient by ID in the database
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.json({ patient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to update an existing patient
const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const {
      title,
      first_name,
      last_name,
      preferred_name,
      dob,
      email,
      phone,
      Note,
    } = req.body;

    // Find the patient by ID in the database
    let patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update the patient properties
    patient.title = title;
    patient.first_name = first_name;
    patient.last_name = last_name;
    patient.preferred_name = preferred_name;
    patient.dob = dob;
    patient.email = email;
    patient.phone = phone;
    patient.Note = Note;

    // Save the updated patient to the database
    patient = await patient.save();

    return res.json({ message: "Patient updated successfully", patient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Controller to delete a patient by ID
const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Find the patient by ID in the database
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Delete the patient from the database
    await patient.remove();

    return res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
