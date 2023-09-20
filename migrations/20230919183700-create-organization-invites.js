'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("organization_invites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      TTL: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      org_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('organization_invites');
  }
};