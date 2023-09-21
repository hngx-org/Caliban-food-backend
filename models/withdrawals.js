'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Withdrawals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Withdrawals.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Withdrawals.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      status: DataTypes.ENUM("pending", "approved", "rejected"),
      amount: DataTypes.DECIMAL(10, 2),
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Withdrawals",
      tableName: "withdrawals",
    }
  );
  return Withdrawals;
};
