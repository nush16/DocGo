const express = require("express");
const appointmentRouter = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} = require("../controllers/appointment_controller");

// Importing the required controller functions from "../controllers/appointment_controller"

// Routes for the appointment controllers

// Route to create a new appointment
appointmentRouter.post("/addappointment", createAppointment);

// Route to get all appointmentss
appointmentRouter.get("/allappointments", getAllAppointments);

// Route to get a specific appointment by ID
appointmentRouter.get("/appointment/:id", getAppointmentById);

// Route to update an appointment by ID
appointmentRouter.put("/appointment/:id", updateAppointmentById);

// Route to delete an appointment by ID
appointmentRouter.delete("/appointment/:id", deleteAppointmentById);

// Exporting the appointmentRouter to make it accessible from other parts of the application
module.exports = appointmentRouter;
