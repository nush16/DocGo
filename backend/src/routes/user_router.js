const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/auth.js');
const adminCheck = require('../middlewares/admin.js');
const userController = require('../controllers/user_controller');

// Route to create a new user
router.post('/users', [authenticateJWT, adminCheck], userController.createUser);

// Route to login
router.post('/login', userController.loginUser);

// Route to get a user by ID
router.get('/users/:id', authenticateJWT, userController.getUserById);

// Route to get all users
router.get('/users', [authenticateJWT, adminCheck], userController.getAllUsers);

// Route to update a user by ID
router.put('/users/:id', authenticateJWT, userController.editUser);

// Route to change password for a user
router.put('/users/:id/password', authenticateJWT, userController.changePassword);

// Route to delete a user by ID
router.delete('/users/:id', [authenticateJWT, adminCheck], userController.deleteUser);

module.exports = router;
