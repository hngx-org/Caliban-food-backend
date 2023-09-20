'use strict';
const {
  Model
} = require('sequelize');

const jwt = require("jsonwebtoken");

// const { JWT_SECRET, JWT_EXPIRE } = require("../config/env");
const { JWT_SECRET, JWT_EXPIRE } = require("../config/config");


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Define association to the Organization model (assuming you have an Organization model)
      User.belongsTo(models.Organization, {
        foreignKey: "org_id",
        as: "organization",
      });

      // Define association to the Withdrawal model (assuming you have a Withdrawal model)
      User.hasMany(models.Withdrawals, {
        foreignKey: "user_id",
        as: "withdrawals",
      });

      // Define association to the Launch model (assuming you have a Launch model)
      User.hasMany(models.Lunches, {
        foreignKey: "sender_id",
        as: "sentLaunches",
      });
      User.hasMany(models.Lunches, {
        foreignKey: "receiver_id",
        as: "receivedLaunches",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      org_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING(255),
      last_name: DataTypes.STRING(255),
      profile_pic: DataTypes.STRING(255),
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: DataTypes.INTEGER,
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      is_admin: DataTypes.BOOLEAN,
      refresh_token: DataTypes.STRING(255),
      bank_number: DataTypes.STRING(255),
      bank_code: DataTypes.STRING(255),
      bank_name: DataTypes.STRING(255),
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  User.prototype.getSignedToken = (user) =>
    jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

  return User;
};