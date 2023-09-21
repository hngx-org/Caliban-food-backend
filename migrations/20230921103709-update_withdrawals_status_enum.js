"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the new ENUM values
    const newEnumValues = ["redeemed", "not_redeemed"];

    // Modify the "status" column to use the new ENUM values
    await queryInterface.changeColumn("withdrawals", "status", {
      type: Sequelize.ENUM(...newEnumValues),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Define the original ENUM values
    const originalEnumValues = ["pending", "approved", "rejected"];

    // Revert the "status" column to use the original ENUM values
    await queryInterface.changeColumn("withdrawals", "status", {
      type: Sequelize.ENUM(...originalEnumValues),
      allowNull: false,
    });
  },
};
