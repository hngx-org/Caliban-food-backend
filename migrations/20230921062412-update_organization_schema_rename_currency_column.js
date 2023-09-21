'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "organization",
      "currency",
      "currency_code",
      {
        type: Sequelize.STRING(4),
        allowNull: false,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "organization",
      "currency_code",
      "currency",
      {
        type: Sequelize.STRING(3), 
        allowNull: false,
      }
    );
  }
};
