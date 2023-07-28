const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getUserById,
  getAllUsers,
} = require("../controllers/user_controller");

// User routes
userRouter.post("/user", createUser);
userRouter.get("/users", getUserById);
userRouter.get("/allusers", getAllUsers);

module.exports = userRouter;
