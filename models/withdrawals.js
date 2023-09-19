const Sequelize = require('sequelize');

const sequelize = require('../configs/dbConfig');

const Withdrawals = sequelize.define('withdrawals', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
     },
    user_id: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status:{
        type: Sequelize.TEXT
    },
    amount:{
        type: Sequelize.BIGINT,
        allowNull: false
    },
})

module.exports = Withdrawals;