"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename the table from 'organization_lunch_wallet' to 'organization_lunch_wallets'
    await queryInterface.renameTable(
      "organization_lunch_wallet",
      "organization_lunch_wallets"
    );
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.renameTable(
     "organization_lunch_wallets",
     "organization_lunch_wallet"
   );
  },
};
