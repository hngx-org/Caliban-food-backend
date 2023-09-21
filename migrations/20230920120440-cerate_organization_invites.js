"use strict";

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      "organization_invites",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: { type: DataTypes.INTEGER, allowNull: false },
        token: { type: Sequelize.STRING, allowNull: false },
        TTL: { type: Sequelize.DATE, allowNull: false },
        org_id: { type: Sequelize.INTEGER },
        is_deleted: DataTypes.BOOLEAN,
      },
      {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("organization_invites");
  },
};
