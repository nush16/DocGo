// Import the Mongoose library
const mongoose = require("mongoose");

// Function to connect to the database
async function databaseConnector(databaseURL) {
  // Wait for the Mongoose library to connect to the specified databaseURL
  await mongoose.connect(databaseURL);
}

// Function to disconnect from the database
async function databaseDisconnector() {
  // Wait for the Mongoose library to close the database connection
  await mongoose.connection.close();
}

// Export the functions to make them accessible to other parts of the application
module.exports = {
  databaseConnector,
  databaseDisconnector,
};
