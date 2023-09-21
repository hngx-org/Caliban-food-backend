const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
// const db = require("./configs/dbConfig");
const routes = require('./routes/api/index');

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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Register Routes

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

app.use(function (err, req, res, next) {
  // Handle errors as JSON responses
  res.status(err.status || 500).json({ error: err.message });
});
// Establish the database connection
dbConnection()
  .then(() => {
    console.log('database Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Error establishing database connection:', error);
  });

module.exports = app;
