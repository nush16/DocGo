const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  business_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Reference to multiple User models
});

const SignUp = mongoose.model("SignUp", SignUpSchema);

module.exports = { SignUp };
