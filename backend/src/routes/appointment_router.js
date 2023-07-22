const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment_controller");

// Route to create a new appointment
router.post("/", appointmentController.createAppointment);

// Route to get all appointments
router.get("/", appointmentController.getAllAppointments);

// Route to get a single appointment by ID
router.get("/:id", appointmentController.getAppointmentById);

// Route to update an existing appointment
router.put("/:id", appointmentController.updateAppointment);

// Route to delete an appointment by ID
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = appointmentRouter;
