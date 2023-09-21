const Sequelize = require("sequelize");

// Creating new Object of Sequelize
const sequelize = new Sequelize(
  "launchfoodapp",
  "root",
  "Mathematicscities5557",
  {
    // Explicitly specifying
    // mysql database
    dialect: "mysql",

    // So by default, host is 'localhost'
    host: "127.0.0.1",
  }
);

module.exports = sequelize;
