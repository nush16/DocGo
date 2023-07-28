const express = require("express");
const signupRouter = express.Router();
const {
  createSignUp,
  getAllSignUps,
  getSignUpById,
} = require("../controllers/signup_controller");

// SignUp routes
signupRouter.post("/signup", createSignUp);
signupRouter.get("/signups", getSignUpById);
signupRouter.get("/allsignups", getAllSignUps);

module.exports = signupRouter;
