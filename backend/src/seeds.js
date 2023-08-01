const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user_model');

// Connect to your MongoDB instance
mongoose.connect('mongodb://localhost/3001', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Wait for the connection to be established
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Seed data for users
const seedUsers = async () => {
  // Data for users
  const users = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true,
      isPractitioner: false
    },
    // Add more user objects here
  ];

  // Loop through the array of user data
  for (const userData of users) {
    // Hash the user's password
    userData.password = await bcrypt.hash(userData.password, 10);

    // Create a new user with the hashed password
    const newUser = new User(userData);

    // Save the user to the database
    await newUser.save();
  }
};

// Call the seed functions
seedUsers().then(() => {
  console.log('Seeding complete');
  mongoose.connection.close();
});
