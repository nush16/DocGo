const express = require("express");
const signupRouter = express.Router();
const {
  signUpController,
  getAllSignUpsController,
} = require("../controllers/signup_controller");

// SignUp routes
signupRouter.post("/signup", signUpController);
signupRouter.get("/signups", getAllSignUpsController);

module.exports = signupRouter;
