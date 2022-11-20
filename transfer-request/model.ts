import sequelize, { DataTypes } from '../database';
import Employee from '../employee/model';

const TransferRequest = sequelize.define('TransferRequest', {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

export default TransferRequest;
