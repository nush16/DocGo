const { SignUp } = require("../models/signup_model");

// Controller for signing up
const signUpController = async (req, res) => {
  try {
    const signUpData = req.body;
    const newSignUp = await SignUp.create(signUpData);
    res.status(201).json(newSignUp);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while signing up." });
  }
};

// Controller for getting all signups
const getAllSignUpsController = async (req, res) => {
  try {
    const allSignUps = await SignUp.find();
    res.status(200).json(allSignUps);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching signups." });
  }
};

module.exports = { signUpController, getAllSignUpsController };
