'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lunches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Define associations to the User model for sender and receiver
      Lunches.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
      Lunches.belongsTo(models.User, {
        foreignKey: 'receiver_id',
        as: 'receiver',
      });
    }
  }
  Lunches.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: DataTypes.INTEGER,
      redeemed: DataTypes.BOOLEAN,
      note: DataTypes.TEXT,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Lunches',
      tableName: 'lunches',
    }
  );
  return Lunches;
};
