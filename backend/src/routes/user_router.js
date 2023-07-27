const express = require("express");
const userRouter = express.Router();
const {
  createUserController,
  getAllUsersController,
} = require("../controllers/user_controller");

// User routes
userRouter.post("/user", createUserController);
userRouter.get("/users", getAllUsersController);

module.exports = userRouter;
