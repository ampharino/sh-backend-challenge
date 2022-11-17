import Company from './model';

export const CompanyRepository = {
  getAllCompanies: async () => {
    const companies = await Company.findAndCountAll();
    return companies;
  },
  createCompany: async (newCompany: { name: string }) => {
    await Company.create({ name: newCompany.name });
  },
  findCompanyByName: async (companyName: string) => {
    return await Company.findOne({ where: { name: companyName } });
  },
  findCompanyById: async (companyId: number) => {
    return await Company.findByPk(companyId);
  },
};
