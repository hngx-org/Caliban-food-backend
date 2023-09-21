"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the org_id column
    await queryInterface.addColumn("lunches", "org_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Add the updated_at column
    await queryInterface.addColumn("lunches", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });

    // Add the is_deleted column
    await queryInterface.addColumn("lunches", "is_deleted", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the is_deleted column
    await queryInterface.removeColumn("lunches", "is_deleted");

    // Remove the updated_at column
    await queryInterface.removeColumn("lunches", "updated_at");

    // Remove the org_id column
    await queryInterface.removeColumn("lunches", "org_id");
  },
};
