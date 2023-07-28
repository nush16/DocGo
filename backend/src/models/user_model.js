const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  signUp: { type: mongoose.Types.ObjectId, ref: "SignUp" }, // Reference to a SignUp model
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
