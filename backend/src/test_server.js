// Import required packages
const express = require("express");
const mongoose = require("mongoose");

// Create the Express application
const app = express();

// Set the port that the server will listen on
const PORT = 3001;

// Define the MongoDB connection string
// If you have MongoDB running locally, this will typically be "mongodb://localhost:27017/myDatabase"
// Replace "myDatabase" with the name of your database
const MONGO_URI = "mongodb://127.0.0.1:27017/my_database";

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create a route handler for GET requests made to the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello, world!");
});

// Start the server, listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
