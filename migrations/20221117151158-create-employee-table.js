'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Employees',
      {
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        employeeId: {
          type: Sequelize.DataTypes.INTEGER,
        },
        companyId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'Companies',
            key: 'id',
          },
          allowNull: false,
        },
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        uniqueKeys: {
          employeeIdentity: { fields: ['employeeId', 'companyId'] },
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  },
};
