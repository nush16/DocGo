const express = require("express");
const signupRouter = express.Router();
const {
  createSignUp,
  getAllSignUps,
  getSignUpById,
} = require("../controllers/signup_controller");

// SignUp routes

// Route to create a new SignUp entry
signupRouter.post("/signup", createSignUp);

// Route to get a specific SignUp entry by ID
signupRouter.get("/signups/:id", getSignUpById);

// Route to get all SignUp entries
signupRouter.get("/allsignups", getAllSignUps);

// Exporting the signupRouter to make it accessible from other parts of the application
module.exports = signupRouter;
