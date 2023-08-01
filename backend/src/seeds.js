const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user_model');

// Connect to your MongoDB instance
mongoose.connect('mongodb://127.0.0.1:27017/docgo_db_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected");
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose connection error: ", err);
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
      first_name: 'Admin', // use the correct field name as defined in your schema
      last_name: 'User', // use the correct field name as defined in your schema
      title: 'Mr.', // add title as it is required in your schema
      isAdministrator: true,
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
