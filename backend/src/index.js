// Import necessary modules and constants
var { app, PORT, HOST } = require("./server");

// Starting the server and listening on the specified host and port
app.listen(PORT, HOST, () => {
  // function will be executed when the server starts successfully
  console.log(`
    ExpressJS API is now running!
    `);
});
