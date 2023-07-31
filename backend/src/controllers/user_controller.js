const User = require("../models/user_model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Controller function for creating a new user
const createUser = async (req, res) => {
  try {
    // Extract the needed information from the request body
    const { email, password, firstName, lastName, isAdmin, isPractitioner } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If a user exists, return a client error with a message
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin,
      isPractitioner
    });

    // Save the user to the database
    await newUser.save();

    // Generate a new JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send back a success response with the newly created user and the token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    // If something went wrong, log the error and send back a server error response
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Controller function for fetching user details by ID
const getUserById = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;

    // Find the user in the database
    const user = await User.findById(userId);
    
    if (!user) {
      // If no user is found, send back a client error response
      return res.status(404).json({ error: 'User not found.' });
    }

    // If the user is found, send back a success response with the user
    res.status(200).json(user);
  } catch (error) {
    // If something went wrong, log the error and send back a server error response
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user.' });
  }
};

// Controller function for fetching all users
const getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    // Send back a success response with all the users
    res.status(200).json(users);
  } catch (error) {
    // If something went wrong, log the error and send back a server error response
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users.' });
  }
};

// Controller function for editing user details
const editUser = async (req, res) => {
    try {
      const { firstName, lastName, isAdmin, isPractitioner } = req.body;
      const userId = req.params.id;
  
      // Check if the provided ID is valid
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID.' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, isAdmin, isPractitioner },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error editing user:', error);
      res.status(500).json({ error: 'Error editing user.' });
    }
  };
  
  // Controller function for changing password
  const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID.' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password.' });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Error changing password.' });
    }
  };
  
  // Controller function for deleting a user
  const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID.' });
      }
  
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user.' });
    }
  };
  
  // Update exported controller functions
  module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    editUser,
    changePassword,
    deleteUser
  };