const express = require("express");
const staffRouter = express.Router();
const {
  getAllStaff,
  createStaff,
  updateStaffById,
  deleteStaffById,
} = require("../controllers/staff_controller");

// Route to get all staff members
staffRouter.get("/staff", getAllStaff);

// Route to create a new staff member
staffRouter.post("/staff", createStaff);

// Route to update a staff member by ID
staffRouter.put("/staff/:id", updateStaffById);

// Route to delete a staff member by ID
staffRouter.delete("/staff/:id", deleteStaffById);

module.exports = staffRouter;
