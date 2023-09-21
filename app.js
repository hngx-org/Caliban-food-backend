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

app.use('/api', routes);

// Establish the database connection
dbConnection();

module.exports = app;