'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn('organization_lunch_wallets', 'createdAt')
      .then(() => {
        return queryInterface.addColumn(
          'organization_lunch_wallets',
          'created_at',
          {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal(
              'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
            ),
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn('organization_lunch_wallets', 'created_at')
      .then(() => {
        return queryInterface.addColumn(
          'organization_lunch_wallets',
          'createdAt',
          {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal(
              'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
            ),
          }
        );
      });
  },
};
