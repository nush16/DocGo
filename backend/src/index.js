// Import necessary modules and constants
const { app, PORT } = require("./server");

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  // callback function executed when the server starts successfully
  console.log("Express server is running on port " + PORT);
});
