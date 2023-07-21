const mongoose = require("mongoose");

// Define the Mongoose schema for the "SignUp" entity
const SignUpSchema = new mongoose.Schema({
  first_name: { type: String, required: true }, // Property for storing the first name (expects a string)
  last_name: { type: String, required: true }, // Property for storing the last name (expects a string)
  business_name: { type: String, required: true }, // Property for storing the date of birth (expects a string)
  email: { type: String, required: true }, // Property for storing the email (expects a string)
  phone: { type: Number, required: true }, // Property for storing the phone (expects a string)
});

// Create a Mongoose model named "SignUp" based on the "SignUpSchema"
const SignUp = mongoose.model("SignUp", SignUpSchema);

// Export the "SignUp" model to make it accessible from other parts of the application
module.exports = { SignUp };
