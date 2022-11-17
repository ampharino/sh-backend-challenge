import Company from '../company/model';
import sequelize, { DataTypes } from '../database';

const Employee = sequelize.define(
  'Employee',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Company,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Employee;
