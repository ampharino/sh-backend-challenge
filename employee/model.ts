import Company from '../company/model';
import sequelize, { DataTypes } from '../database';

const Employee = sequelize.define(
  'Employee',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
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
