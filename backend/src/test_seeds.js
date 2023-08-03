// Require Mongoose
const mongoose = require('mongoose');
const User = require('./models/user'); // assuming you have a user model at models/user.js

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/docgo_db_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!');
});

// User data that you want to insert into the database
const userData = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'testpassword123'
};

// Create a new User
const user = new User(userData);

// Save it into the database
user.save()
  .then(document => {
    console.log('User created: ', document);
    // Close the connection after done
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
