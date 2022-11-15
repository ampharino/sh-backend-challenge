import sequelize, { DataTypes } from '../../database';
const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Company;
