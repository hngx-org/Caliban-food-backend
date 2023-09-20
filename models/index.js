const sequelize = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

//connect the database
sequelize.authenticate()
    .then(() => {
        console.log('connected to the databse')
    })
    .catch(err => {
        console.log('Error' + err)
    })

//create a database object that has the sequelize object, and models

const db = {}
db.sequelize = sequelize
db.models = {}
db.models.reward = require('./reward')(sequelize, DataTypes)

//sync the db to the local database
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('resync done')
    })



module.exports = db