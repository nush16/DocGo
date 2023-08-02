const express = require('express');
const router = express.Router();

// Import the JWT authentication middleware
const authenticateJWT = require('../middlewares/auth');

// Import the appointment controller
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointment_controller');

// Routes for appointments
router.post('/', authenticateJWT, createAppointment);
router.get('/', authenticateJWT, getAllAppointments);
router.get('/:id', authenticateJWT, getAppointmentById);
router.put('/:id', authenticateJWT, updateAppointment);
router.delete('/:id', authenticateJWT, deleteAppointment);

// Export the router
module.exports = router;
