'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      org_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Allow null for org_id as it's a foreign key
      },
      first_name: {
        type: Sequelize.STRING(255),
      },
      last_name: {
        type: Sequelize.STRING(255),
      },
      profile_pic: {
        type: Sequelize.STRING(255),
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: true, // Allow null for phone
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
      },
      refresh_token: {
        type: Sequelize.STRING(255),
      },
      bank_number: {
        type: Sequelize.STRING(255),
      },
      bank_code: {
        type: Sequelize.STRING(255),
      },
      bank_name: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};