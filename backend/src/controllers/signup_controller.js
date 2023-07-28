const { SignUp } = require("../models/signup_model");

// Controller function for creating a new sign-up entry
async function createSignUp(request, response) {
  try {
    const { first_name, last_name, business_name, email, password } =
      request.body;
    const newSignUp = new SignUp({
      first_name,
      last_name,
      business_name,
      email,
      password,
    });
    const savedSignUp = await newSignUp.save();
    response.status(201).json(savedSignUp);
  } catch (err) {
    response.status(500).json({ error: "Failed to create sign-up entry." });
  }
}

// Controller function for fetching all sign-up entries
async function getAllSignUps(request, response) {
  try {
    const signUps = await SignUp.find().populate("users"); // Populating the 'users' field with associated User models
    response.status(200).json(signUps);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch sign-up entries." });
  }
}

// Controller function for fetching sign-up entry details by ID
async function getSignUpById(request, response) {
  try {
    const signUpId = request.params.id;
    const signUp = await SignUp.findById(signUpId).populate("users"); // Populating the 'users' field with associated User models
    if (!signUp) {
      return response.status(404).json({ error: "Sign-up entry not found." });
    }
    response.status(200).json(signUp);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch sign-up entry." });
  }
}

// Add more controller functions for other sign-up-related operations if needed

module.exports = {
  createSignUp,
  getAllSignUps,
  getSignUpById,
  // Add other exported controller functions here if needed
};
