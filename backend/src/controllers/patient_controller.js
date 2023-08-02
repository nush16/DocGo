const Patient = require("../models/patient_model");
const authenticateJWT = require("../middlewares/auth.js");

// Controller function for creating a patient
async function createPatient(request, response) {
  try {
    const newPatient = await Patient.create(request.body);
    response.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to create the patient" });
  }
}

// Controller to retrieve all patients
async function getAllPatients(request, response) {
  try {
    const patients = await Patient.find();
    response.status(200).json(patients);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch patients" });
  }
}

// Controller to retrieve a single patient by ID
async function getPatientById(request, response) {
  try {
    const patient = await Patient.findById(request.params.id);
    if (!patient) {
      return response.status(404).json({ error: "Patient not found" });
    }
    response.status(200).json(patient);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch the patient" });
  }
}

// Controller to update a patient by ID
async function updatePatientById(request, response) {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    if (!updatedPatient) {
      return response.status(404).json({ error: "Patient not found" });
    }
    response.status(200).json(updatedPatient);
  } catch (err) {
    response.status(500).json({ error: "Failed to update the patient" });
  }
}

// Controller to delete a patient by ID
async function deletePatientById(request, response) {
  try {
    const deletedPatient = await Patient.findByIdAndRemove(request.params.id);
    if (!deletedPatient) {
      return response.status(404).json({ error: "Patient not found" });
    }
    response.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    response.status(500).json({ error: "Failed to delete the patient" });
  }
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
};
