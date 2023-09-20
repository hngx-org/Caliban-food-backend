const { Sequelize } = require("sequelize");

require("dotenv").config();

const database = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Connection to db
const dbConnection = async () => {
  try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return error;
  }
};

module.exports = { database, dbConnection };
