const Sequelize = require("sequelize");

// Creating new Object of Sequelize
const sequelize = new Sequelize(
    'lunch-db',
    'root',
    'toor', {
  
        // Explicitly specifying 
        // mysql database
        dialect: 'mysql',

        // So by default, host is 'localhost'           
        host: 'localhost',
        logging: console.warn // Enable logging
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("error during connecting");
  });

module.exports = sequelize;
