'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization_lunch_wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Organization_lunch_wallet.belongsTo(models.Organization, {
         foreignKey: "org_id",
       });
    }
  }
  Organization_lunch_wallet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: DataTypes.DECIMAL(10, 2),
      org_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrganizationLaunchWallet",
      tableName: "organization_launch_wallet",
    }
  );
  return Organization_lunch_wallet;
};