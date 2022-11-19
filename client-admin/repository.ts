import ClientAdmin from './model';

export const ClientAdminRepository = {
  createClientAdmin: async (newClientAdmin: {
    name: string;
    companyId: number;
  }) => {
    await ClientAdmin.create(newClientAdmin);
  },
  getClientAdminByName: async (name: string, companyId: number) => {
    return await ClientAdmin.findOne({ where: { name, companyId } });
  },
  getClientAdminById: async (clientAdminId: number, companyId: number) => {
    return await ClientAdmin.findOne({
      where: { id: clientAdminId, companyId },
    });
  },
};
