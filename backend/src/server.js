// Load environment variables from .env file
require('dotenv').config();

// Import the Express package and create the app instance
const express = require('express');
const app = express();

// Set default values for HOST and PORT from environment variables, if not specified
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3001;

// Helmet middleware for enhancing server security
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

// CORS middleware for handling cross-origin requests
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000'], // Allow requests from this origin
  optionsSuccessStatus: 200, // Set the HTTP status code for successful CORS preflight requests
};
app.use(cors(corsOptions));

// Middleware to parse request data as JSON and URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and configure Mongoose for MongoDB
const mongoose = require('mongoose');

// Connect to database using database URL from .env
const { databaseConnector } = require('./database');
databaseConnector(process.env.DATABASE_URL)
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => {
    console.error('Error occurred connecting to the database:', error);
  });

// Route to check the health of the database connection
app.get('/databaseHealth', (request, response) => {
  let databaseState = mongoose.connection.readyState;
  let databaseName = mongoose.connection.name;
  let databaseModels = mongoose.connection.modelNames();
  let databaseHost = mongoose.connection.host;

  response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost,
  });
});

// Route for the homepage
app.get('/', (request, response) => {
  response.json({
    message: 'Hello world!',
  });
});

// Import and setup JWT middleware for authentication
const jwtMiddleware = require('./middlewares/auth.js');
app.use(jwtMiddleware());

// Import and setup admin middleware for admin routes
const adminMiddleware = require('./middlewares/admin');
app.use('/admin', adminMiddleware);

// Import the user router and setup its routes
const userRouter = require('./routes/user_router');
app.use('/user', userRouter);

// Route for handling 404 errors (no route found)
app.use('*', (request, response) => {
  response.status(404).json({
    message: 'No route with that path found!',
    attemptedPath: request.path,
  });
});

// Export necessary data to run the server
module.exports = {
  HOST,
  PORT,
  app,
};
