const { User } = require("../models/user_model");

// Controller function for creating a new user
async function createUser(request, response) {
  try {
    const { email, password } = request.body;
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (err) {
    response.status(500).json({ error: "Failed to create user." });
  }
}

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
