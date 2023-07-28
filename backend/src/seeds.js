// Import the Mongoose models for User and SignUp
const mongoose = require("mongoose");
const { User } = require("./models/user_model");
const { SignUp } = require("./models/signup_model");

// Function to seed data into the database
const seedData = async () => {
  try {
    // Seed SignUps
    const signUps = [
      {
        first_name: "Tom",
        last_name: "Brady",
        business_name: "ABC Clinic",
        email: "Tom.Brady@example.com",
        phone: "1234567890",
      },
      {
        first_name: "Kai",
        last_name: "Yu",
        business_name: "NEW Clinic",
        email: "Kai.Yu@example.com",
        phone: "9876543210",
      },
    ];
    const seededSignUps = await SignUp.create(signUps);

    // Seed Users
    const users = [
      {
        email: "Tom.Brady@example.com",
        password: "password1",
        signUp: seededSignUps[0]._id,
      }, // Reference the first signup for the User
      {
        email: "Kate.Lam@example.com",
        password: "password2",
        signUp: seededSignUps[0]._id,
      }, // Reference the second signup for the User
      {
        email: "Rajesh.Abeyan@example.com",
        password: "password3",
        signUp: seededSignUps[0]._id,
      }, // Reference the second signup for the User
      {
        email: "Laura.Simmons@example.com",
        password: "password4",
        signUp: seededSignUps[0]._id,
      }, // Reference the second signup for the User
      {
        email: "Kai.Yu@example.com",
        password: "password5",
        signUp: seededSignUps[1]._id,
      }, // Reference the second signup for the User
    ];
    await User.create(users);

    // Use populate() to fetch the associated data when seeding
    const signUpsWithUsers = await SignUp.find().populate("users");
    console.log("SignUps with associated Users:", signUpsWithUsers);

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the Mongoose connection after seeding the data
    mongoose.connection.close();
  }
};

module.exports = seedData;
