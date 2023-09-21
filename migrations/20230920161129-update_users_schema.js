"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "lunch_credit_balance", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("users", "bank_region", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn("users", "currency", {
      type: Sequelize.STRING(128),
      allowNull: true,
    });

    await queryInterface.addColumn("users", "currency_code", {
      type: Sequelize.STRING(4),
      allowNull: true,
    });

    await queryInterface.addColumn("users", "is_deleted", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "lunch_credit_balance");
    await queryInterface.removeColumn("users", "bank_region");
    await queryInterface.removeColumn("users", "currency");
    await queryInterface.removeColumn("users", "currency_code");
    await queryInterface.removeColumn("users", "is_deleted");
  },
};
