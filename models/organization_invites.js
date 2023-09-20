'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization_invites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Organization_invites.belongsTo(models.Organization, {
         foreignKey: "org_id",
         as: "organization",
       });
    }
  }
  Organization_invites.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING(255),
      token: DataTypes.STRING(255),
      ttl: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Organization_invites",
      tableName: "organization_invites",
    }
  );
  return Organization_invites;
};