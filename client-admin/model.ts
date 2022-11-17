import Company from '../company/model';
import sequelize, { DataTypes } from '../database';

const ClientAdmin = sequelize.define(
  'ClientAdmin',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// TODO: Find a better place to put associations?
Company.hasMany(ClientAdmin, { foreignKey: 'companyId' });
ClientAdmin.belongsTo(Company, { foreignKey: 'companyId' });

export default ClientAdmin;
