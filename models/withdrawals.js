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
<<<<<<< HEAD
=======
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
>>>>>>> 5f42e90a05ec59184b98a49ff6644ab117861901
      user_id: DataTypes.INTEGER,
      status: DataTypes.ENUM("pending", "approved", "rejected"),
      amount: DataTypes.DECIMAL(10, 2),
      created_at: DataTypes.DATE,
<<<<<<< HEAD
=======
      // is_deleted: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      // },
      // created_at: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW,
      // },
      // updated_at: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW,
      // },
>>>>>>> 5f42e90a05ec59184b98a49ff6644ab117861901
    },
    {
      sequelize,
      modelName: "Withdrawals",
      tableName: "withdrawals",
    }
  );
  return Withdrawals;
};
