// const Sequelize = require("sequelize");

// const sequelize = require("../configs/dbConfig");

module.exports = (sequelize, DataTypes) => {
  const Lunches = sequelize.define("lunch", {
    senderId: DataTypes.STRING,
    receiverId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    redeemed: DataTypes.BOOLEAN,
    note: DataTypes.TEXT,
  });
  return Lunches;
};

// const Lunches = sequelize.define("lunch ", {
//   id: {
//     type: Sequelize.STRING,
//     primaryKey: true,
//     allowNull: false,
//   },
//   senderId: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//   },
//   receiverId: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//   },
//   quantity: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   redeemed: {
//     type: Sequelize.BOOLEAN,
//   },
//   note: {
//     type: Sequelize.TEXT,
//   },
// });
