const Sequelize = require('sequelize');

const sequelize = require('../configs/dbConfig');

const Lunches = sequelize.define('lunches', {
    id: {
       type: Sequelize.STRING,
       primaryKey: true,
       allowNull: false
    },
    senderId: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    receiverId:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    redeemed:{
        type:Sequelize.BOOLEAN
    },
    note: {
        type: Sequelize.TEXT
    }
})

module.exports = Lunches;