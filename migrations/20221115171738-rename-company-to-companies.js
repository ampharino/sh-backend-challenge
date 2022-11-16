'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Company', 'Companies');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('Companies', 'Company');
  },
};