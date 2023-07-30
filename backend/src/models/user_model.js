const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  signup: [{ type: mongoose.Schema.Types.ObjectId, ref: "Signup" }], // Reference to a SignUp model
  // staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
