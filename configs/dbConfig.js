const Sequelize = require('sequelize')
  
// Creating new Object of Sequelize
const sequelize = new Sequelize(
    'reward-db',
    'root',
    'toor', {
  
        
        dialect: 'mysql',

        // So by default, host is 'localhost'           
        host: 'localhost'
    }
);
  
module.exports = sequelize