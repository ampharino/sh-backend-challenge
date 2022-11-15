import Company from './model';

export const CompanyRepository = {
  getAllCompanies: async () => {
    const companies = await Company.findAndCountAll();
    return companies;
  },
};
