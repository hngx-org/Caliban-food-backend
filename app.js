<<<<<<< HEAD
// Import required modules and libraries
const createError = require("http-errors"); // Library for creating HTTP errors
const express = require("express"); // Express.js web application framework
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const logger = require("morgan"); // Middleware for logging HTTP requests
const dotenv = require("dotenv"); // Library for loading environment variables
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
=======
const createError = require('http-errors');
const express = require('express');
// const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// const db = require("./configs/dbConfig");
const routes = require('./routes/api/index');
// const bank = require('./routes/api/userInfo');

const errorHandler = require('./utils/errrorHandler');
const { loggerMiddleware } = require('./utils/logger');
const { dbConnection } = require('./utils/database/dbConnection');

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
>>>>>>> a980ef5b14d29c46486a36c41a694afe47ea0766

// Import router for API routes
const v1Router = require("./routes/api/index");

// Import custom error handler and logger middleware
const errorHandler = require("./utils/errrorHandler");
const { loggerMiddleware } = require("./utils/logger");

// Import and establish the database connection
const { dbConnection } = require("./utils/database/dbConnection");

// Configure CORS options
const corsOptions = {
  origin: "*", // Allow requests from any origin (you may want to restrict this in a production environment)
  credentials: true, // Enable credentials (cookies, HTTP authentication)
  optionSuccessStatus: 200, // HTTP status code for successful CORS preflight requests
};

// Load environment variables from a .env file (if available)
dotenv.config();

// Initialize the Express application
const app = express();

<<<<<<< HEAD
// Middleware stack
app.use(cors(corsOptions)); // Enable CORS for the application
app.use(logger("dev")); // Log HTTP requests to the console in the "dev" format
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies in HTTP requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(loggerMiddleware); // Custom logger middleware

// Define API routes
app.use("/api/v1", v1Router);

// Handle 404 errors by creating a HTTP 404 error and passing it to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler middleware to handle all errors (both HTTP and application-specific)
app.use(errorHandler);

// Establish the database connection
dbConnection()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Error establishing database connection:", error);
  });
=======
// Middlewares
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);


// Establish the database connection
dbConnection();
>>>>>>> a980ef5b14d29c46486a36c41a694afe47ea0766

// Export the Express application instance
module.exports = app;
