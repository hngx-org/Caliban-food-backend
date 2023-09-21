const createError = require('http-errors');
const express = require('express');
// const path = require("path");
<<<<<<< HEAD
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// const db = require("./configs/dbConfig");
const v1Router = require('./routes/api/index');
const bank = require('./routes/api/userInfo');

const errorHandler = require('./utils/errrorHandler');
const { loggerMiddleware } = require('./utils/logger');
const { dbConnection } = require('./utils/database/dbConnection');
=======
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const v1Router = require("./routes/api/index");

const errorHandler = require("./utils/errrorHandler");
const { loggerMiddleware } = require("./utils/logger");
const { dbConnection } = require("./utils/database/dbConnection");
>>>>>>> feature/sendlunch

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
<<<<<<< HEAD
const sequelize = require("./configs/dbConfig");
=======

>>>>>>> feature/sendlunch
// App Init
const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
// App Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Lunch App API");
});

// Register Routes
require("./routes/index.routes")(app);

// We'd uncomment this db function call once we have the connection strings and add it to the db file.
// db();
=======
app.use("/api/v1", v1Router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// app.use("/api/v1", v1Router);

app.use(errorHandler);

// error handler
// app.use(function (err, req, res, next) {
//   // Handle errors as JSON responses
//   res.status(err.status || 500).json({ error: err.message });
// });

// Establish the database connection
dbConnection()
  .then(() => {
    console.log("database Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Error establishing database connection:", error);
  });
>>>>>>> feature/sendlunch

module.exports = app;
