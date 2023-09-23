'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.hasMany(models.User, { foreignKey: 'org_id', as: 'users' });

      //change here
      Organization.hasMany(models.Organization_invites, {
        foreignKey: 'org_id',
        as: 'invites',
      });

      Organization.hasOne(models.OrganizationLaunchWallet, {
        foreignKey: 'org_id',
        as: 'launchWallet',
      });

      // Association with the Lunches model (lunches)
      Organization.hasMany(models.Lunches, {
        foreignKey: 'org_id',
        as: 'lunches',
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
      currency_code: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
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
      modelName: 'Organization',
      tableName: 'organization',
      timestamps: false,
    }
  );
  return Organization;
};
