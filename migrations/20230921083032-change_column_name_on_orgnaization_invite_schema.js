'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("organization_invites", "TTL", "ttl");
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.renameColumn("organization_invites", "ttl", "TTL");
  }
};
