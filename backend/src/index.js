// // Import necessary modules and constants
// var { app, PORT, HOST } = require("./server");

// // Starting the server and listening on the specified host and port
// app.listen(PORT, HOST, () => {
//   // function will be executed when the server starts successfully
//   console.log(`
//     ExpressJS API is now running!
//     `);
// });

// Import necessary modules and constants
var { app, PORT, HOST } = require("./server");
// const mongoose = require("mongoose");
const seedData = require("./seeds");

// // Starting the server and listening on the specified host and port
// app.listen(PORT, HOST, () => {
//   // function will be executed when the server starts successfully
//   console.log(`
//     ExpressJS API is now running!
//     `);
// });

// Seed data into the database
seedData()
  .then(() => {
    // Start the server after seeding the data
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
  });
