// Import the Mongoose models for User and SignUp
const mongoose = require("mongoose");
const { User } = require("./models/user_model");
const { SignUp } = require("./models/signup_model");
const { Staff } = require("./models/staffs_model");

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
        password: "password1",
      },
      {
        first_name: "Kai",
        last_name: "Yu",
        business_name: "NEW Clinic",
        email: "Kai.Yu@example.com",
        password: "password5",
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

    const staff = [
      {
        title: "Doctor",
        first_name: "Tom",
        last_name: "Brady",
        email: "Tom.Brady@example.com",
        user: users[0]._id, // Reference the first user for the Staff
      },
      {
        title: "Doctor",
        first_name: "Kate",
        last_name: "Lam",
        email: "Kate.Lam@example.com",
        user: users[1]._id, // Reference the second user for the Staff
      },
      {
        title: "Doctor",
        first_name: "Rajesh",
        last_name: "Abeyan",
        email: "Rajesh.Abeyan@example.com",
        user: users[2]._id, // Reference the second user for the Staff
      },
      {
        title: "Admin",
        first_name: "Laura",
        last_name: "Simmons",
        email: "Laura.Simmons@example.com",
        user: users[3]._id, // Reference the second user for the Staff
      },
      {
        title: "Doctor",
        first_name: "Kai",
        last_name: "Yu",
        email: "Kai.Yu@example.com",
        user: users[4]._id, // Reference the second user for the Staff
      },
    ];
    await Staff.create(staff);

    // Use populate() to fetch the associated data when seeding
    const signUpsWithUsers = await SignUp.find().populate("users");
    console.log("SignUps with associated Users:", signUpsWithUsers);

    // Use populate() to fetch the associated data when seeding
    const signUpsWithStaff = await SignUp.find().populate({
      path: "users",
      populate: { path: "staff" },
    });
    console.log("SignUps with associated Users and Staff:", signUpsWithStaff);

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the Mongoose connection after seeding the data
    mongoose.connection.close();
  }
};

module.exports = seedData;
