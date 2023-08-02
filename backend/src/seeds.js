const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user_model');
const Patient = require('./models/patient_model');

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

const clearDB = async () => {
  await User.deleteMany({});  // Delete all User documents
  await Patient.deleteMany({});  // Delete all Patient documents
  // Add similar line to clear appointments once you have the Appointment model
}

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
    {
      email: 'jane.doe@example.com',
      password: 'jane123',
      first_name: 'Jane',
      last_name: 'Doe',
      title: 'Mrs.',
      isAdministrator: false,
      isPractitioner: true
    },
    {
      email: 'robert.smith@example.com',
      password: 'robert123',
      first_name: 'Robert',
      last_name: 'Smith',
      title: 'Dr.',
      isAdministrator: true,
      isPractitioner: false
    },
    {
      email: 'david.jones@example.com',
      password: 'david123',
      first_name: 'David',
      last_name: 'Jones',
      title: 'Mr.',
      isAdministrator: false,
      isPractitioner: true
    }    
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

// Seed data for patients
const seedPatients = async () => {
  const patients = [
    {
      title: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      preferred_name: 'Johnny',
      dob: new Date('1980-01-01'),
      email: 'john.doe@example.com',
      phone: '1234567890',
      note: 'Allergic to penicillin'
    },
    {
      title: 'Ms.',
      first_name: 'Jane',
      last_name: 'Smith',
      preferred_name: 'Janey',
      dob: new Date('1990-03-05'),
      email: 'jane.smith@example.com',
      phone: '0987654321',
      note: 'Vegan'
    },
    {
      title: 'Dr.',
      first_name: 'Robert',
      last_name: 'Brown',
      preferred_name: 'Rob',
      dob: new Date('1970-07-23'),
      email: 'robert.brown@example.com',
      phone: '1122334455',
      note: 'Diabetic'
    },
    {
      title: 'Mr.',
      first_name: 'David',
      last_name: 'Johnson',
      preferred_name: 'Dave',
      dob: new Date('1985-11-15'),
      email: 'david.johnson@example.com',
      phone: '5566778899',
      note: 'Lactose intolerant'
    }    
    // Add more patient objects here...
  ];

  for (const patientData of patients) {
    const newPatient = new Patient(patientData);
    await newPatient.save();
  }
};

// Call the clearDB function first to clear the database
clearDB().then(() => {
  // Then seed the data
  Promise.all([seedUsers(), seedPatients()]).then(() => {
    console.log('Seeding complete');
    mongoose.connection.close();
  });
});