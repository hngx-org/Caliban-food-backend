"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("organization_lunch_wallets", "updatedAt")
      .then(() => {
        return queryInterface.addColumn("organization_lunch_wallets", "updated_at", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ),
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("organization_lunch_wallets", "updated_at")
      .then(() => {
        return queryInterface.addColumn("organization_lunch_wallets", "updatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ),
        });
      });
  },
};
