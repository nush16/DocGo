const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  title: { type: String, required: true }, // Only required for Staff, not for Signup
  isAdministrator: { type: Boolean, default: true }, // New field to distinguish an Administrator
  isPractitioner: { type: Boolean, default: true }, // New field to distinguish a Practitioner
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
