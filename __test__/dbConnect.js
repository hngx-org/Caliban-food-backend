// test-database-config.js

const { Sequelize } = require("sequelize");

require("dotenv").config();

// const testDatabase = new Sequelize({
//   dialect: "mysql",
//   dialectOptions: {
//     connectTimeout: 30000, // Increase the connect timeout to 30 seconds (in milliseconds)
//   },
//   host: process.env.TEST_DB_HOST,
//   port: process.env.TEST_DB_PORT,
//   username: process.env.TEST_DB_USERNAME,
//   password: process.env.TEST_DB_PASSWORD,
//   // database: process.env.TEST_DB_NAME,
// });

const testDatabase = new Sequelize(process.env.DB_URL_TEST)

module.exports = testDatabase;
