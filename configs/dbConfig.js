const Sequelize = require('sequelize')
  
// Creating new Object of Sequelize
const sequelize = new Sequelize(
    'DATABASE_NAME',
    'DATABASE_USER_NAME',
    'DATABASE_PASSWORD', {
  
        // Explicitly specifying 
        // mysql database
        dialect: 'mysql',
  
        // So by default, host is 'localhost'           
        host: 'localhost'
    }
);
  
module.exports = sequelize