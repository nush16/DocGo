const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

// Route to create a new user
router.post('/', userController.createUser);

// Route to get a user by ID
router.get('/:id', userController.getUserById);

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to update a user by ID
router.put('/:id', userController.updateUserById);

// Route to change password for a user
router.put('/:id/changePassword', userController.changePassword);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;
