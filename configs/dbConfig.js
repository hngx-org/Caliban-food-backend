const Sequelize = require("sequelize");

// Creating new Object of Sequelize
const sequelize = new Sequelize("freelunch", "root", "", {
  // Explicitly specifying
  // mysql database
  // So by default, host is 'localhost'
  host: "localhost",
  dialect: "mysql",

  logging: console.warn, // Enable logging
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Lunches = require("../models/lunches")(
  sequelize,
  Sequelize.DataTypes
);
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection established");
//   })
//   .catch((err) => {
//     console.log("error during connecting");
//   });

module.exports = db;
