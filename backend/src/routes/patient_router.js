const express = require("express");
const patientRouter = express.Router();
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patient_controller");

// Route to create a new patient
patientRouter.post("/", createPatient);

// Route to get all patients
patientRouter.get("/", getAllPatients);

// Route to get a single patient by ID
patientRouter.get("/:id", getPatientById);

// Route to update an existing patient
patientRouter.put("/:id", updatePatientById);

// Route to delete a patient by ID
patientRouter.delete("/:id", deletePatientById);

module.exports = patientRouter;
