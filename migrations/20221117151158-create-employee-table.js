'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      employeeId: {
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      companyId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Companies',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  },
};
