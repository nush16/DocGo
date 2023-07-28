const { SignUp } = require("../models/signup_model");

// Controller function for creating a new sign-up entry
async function createSignUp(req, res) {
  try {
    const { first_name, last_name, business_name, email, phone } = req.body;
    const newSignUp = new SignUp({
      first_name,
      last_name,
      business_name,
      email,
      phone,
    });
    const savedSignUp = await newSignUp.save();
    res.status(201).json(savedSignUp);
  } catch (err) {
    res.status(500).json({ error: "Failed to create sign-up entry." });
  }
}

// Controller function for fetching all sign-up entries
async function getAllSignUps(req, res) {
  try {
    const signUps = await SignUp.find().populate("users"); // Populating the 'users' field with associated User models
    res.status(200).json(signUps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sign-up entries." });
  }
}

// Controller function for fetching sign-up entry details by ID
async function getSignUpById(req, res) {
  try {
    const signUpId = req.params.id;
    const signUp = await SignUp.findById(signUpId).populate("users"); // Populating the 'users' field with associated User models
    if (!signUp) {
      return res.status(404).json({ error: "Sign-up entry not found." });
    }
    res.status(200).json(signUp);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sign-up entry." });
  }
}

// Add more controller functions for other sign-up-related operations if needed

module.exports = {
  createSignUp,
  getAllSignUps,
  getSignUpById,
  // Add other exported controller functions here if needed
};
