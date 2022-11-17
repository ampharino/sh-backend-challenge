import { BusinessLogicError } from '../errors';
import { CompanyRepository } from './repository';

export const getCompanies = async () => {
  return await CompanyRepository.getAllCompanies();
};

export const createCompany = async (newCompany: { name: string }) => {
  if (await CompanyRepository.findCompanyByName(newCompany.name)) {
    // TODO: Create error variable for error message
    throw new BusinessLogicError('Company with that name already exists');
  }
  return await CompanyRepository.createCompany(newCompany);
};
