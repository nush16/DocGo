const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient_controller");

// Route to create a new patient
router.post("/", patientController.createPatient);

// Route to get all patients
router.get("/", patientController.getAllPatients);

// Route to get a single patient by ID
router.get("/:id", patientController.getPatientById);

// Route to update an existing patient
router.put("/:id", patientController.updatePatient);

// Route to delete a patient by ID
router.delete("/:id", patientController.deletePatient);

module.exports = patientRouter;
