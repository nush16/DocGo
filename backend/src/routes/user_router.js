const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getUserById,
  getAllUsers,
} = require("../controllers/user_controller");

// User routes

// Route to create a new user
userRouter.post("/createuser", createUser);

// Route to get a specific user by ID
userRouter.get("/users/:id", getUserById);

// Route to get all users
userRouter.get("/allusers", getAllUsers);

// Exporting the userRouter to make it accessible from other parts of the application
module.exports = userRouter;
