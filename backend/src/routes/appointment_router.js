const express = require("express");
const appointmentRouter = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} = require("../controllers/appointment_controller");

// Routes for the appointment controllers
appointmentRouter.post("/", createAppointment);
appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.put("/:id", updateAppointmentById);
appointmentRouter.delete("/:id", deleteAppointmentById);

module.exports = appointmentRouter;
