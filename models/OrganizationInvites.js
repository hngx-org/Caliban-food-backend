const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../configs/dbConfig");

const OrganizationInvite = sequelize.define(
  "OrganizationInvite", // Model name should be in camelCase
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING, // Change INTEGER to STRING
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING, // Change Sequelize.STRING to DataTypes.STRING
      allowNull: false,
    },
    TTL: {
      type: DataTypes.DATE, // Change Sequelize.DATE to DataTypes.DATE
      allowNull: false,
    },
    org_id: {
      type: DataTypes.INTEGER, // Change Sequelize.INTEGER to DataTypes.INTEGER
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Provide a default value for the boolean field
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Remove the force: true option unless you want to recreate the table and delete existing data
OrganizationInvite.sync();

module.exports = OrganizationInvite; // Export the corrected model name (OrganizationInvite)
