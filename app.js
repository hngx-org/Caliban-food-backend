const createError = require('http-errors');
const express = require('express');
// const path = require("path");
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

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
const sequelize = require("./configs/dbConfig");
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

// App Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Lunch App API");
});

// Register Routes
require("./routes/index.routes")(app);

// We'd uncomment this db function call once we have the connection strings and add it to the db file.
// db();

module.exports = app;
