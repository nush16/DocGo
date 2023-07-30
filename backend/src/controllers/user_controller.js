const User = require("../models/user_model");
const SignUp = require("../models/signup_model");

// Controller function for creating a new user
// async function createUser(request, response) {
//   try {
//     const { email, password } = request.body;
//     const newUser = new User({ email, password });
//     const savedUser = await newUser.save();
//     response.status(201).json(savedUser);
//   } catch (err) {
//     response.status(500).json({ error: "Failed to create user." });
//   }
// }

// Controller function to create a new user and display the SignUpSchema ID
const createUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, business_name } = req.body;

    // Create a new SignUpSchema entry
    const signUpData = new SignUp({
      first_name,
      last_name,
      business_name,
      email,
      password,
    });
    const newSignUp = await signUpData.save();

    // Create a new User with the SignUpSchema ID reference
    const userData = new User({
      email,
      password,
      signup: newSignUp._id, // Assign the SignUpSchema ID reference
    });
    const newUser = await userData.save();

    res.json({ user: newUser, signUpId: newSignUp._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Controller function for fetching user details by ID
async function getUserById(request, response) {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    response.status(200).json(user);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch user." });
  }
}

// Controller function to fetch all users
async function getAllUsers(request, response) {
  try {
    const users = await User.find();
    response.status(200).json(users);
  } catch (err) {
    response.status(500).json({ error: "Failed to fetch users." });
  }
}

// Add more controller functions for other user-related operations if needed

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  // Add other exported controller functions here if needed
};
