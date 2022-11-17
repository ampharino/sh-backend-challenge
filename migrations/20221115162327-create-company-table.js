'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  },
};
