'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      Organization.hasMany(models.User, { foreignKey: "org_id", as: "users" });
    
      //change here
      Organization.hasMany(models.Organization_invites, {
        foreignKey: "org_id",
        as: "invites",
      });

      Organization.hasOne(models.OrganizationLaunchWallet, {
        foreignKey: "org_id",
        as: "launchWallet",
      });
    }
  }
  Organization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(255),
      lunch_price: DataTypes.DECIMAL(10, 2),
      currency: DataTypes.STRING(3),
    },
    {
      sequelize,
      modelName: "Organization", // Adjust the model name to start with a capital letter
      tableName: "organization", // Set the table name to match the native MySQL script
    }
  );
  return Organization;
};