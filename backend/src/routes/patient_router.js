const express = require("express");
const patientRouter = express.Router();
const authenticateJWT = require("../middlewares/auth.js");
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patient_controller");

// Route to create a new patient
patientRouter.post("/", authenticateJWT, createPatient);

// Route to get all patients
patientRouter.get("/", authenticateJWT, getAllPatients);

// Route to get a single patient by ID
patientRouter.get("/:id", authenticateJWT, getPatientById);

// Route to update an existing patient
patientRouter.put("/:id", authenticateJWT, updatePatientById);

// Route to delete a patient by ID
patientRouter.delete("/:id", authenticateJWT, deletePatientById);

// Exporting the patientRouter to make it accessible from other parts of the application
module.exports = patientRouter;
