const { User } = require("../models/user_model");

// Controller for creating a new user
const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a user." });
  }
};

// Controller for getting all users
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

module.exports = { createUserController, getAllUsersController };
