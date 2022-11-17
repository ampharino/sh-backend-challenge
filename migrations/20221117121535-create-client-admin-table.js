'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.createTable(
          'ClientAdmins',
          {
            name: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
            },
            id: {
              type: Sequelize.DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              unique: true,
            },
            companyId: {
              type: Sequelize.DataTypes.INTEGER,
              references: {
                model: 'Companies',
                key: 'id',
              },
              allowNull: false,
            },
          },
          { transaction }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.dropTable('ClientAdmins', { transaction }),
      ]);
    });
  },
};
