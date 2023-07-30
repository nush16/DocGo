const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  business_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const SignUp = mongoose.model("Signup", SignUpSchema);

module.exports = SignUp;
