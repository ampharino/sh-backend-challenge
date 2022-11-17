import { ClientAdminRepository } from '../client-admin/repository';
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

export const createClientAdmin = async (newClientAdmin: {
  name: string;
  companyId: number;
}) => {
  const { name, companyId } = newClientAdmin;
  if (!(await CompanyRepository.findCompanyById(companyId))) {
    throw new BusinessLogicError(`Company with id ${companyId} does not exist`);
  }
  if (await ClientAdminRepository.getClientAdminByName(name, companyId)) {
    throw new BusinessLogicError(
      `This company already has a client admin named ${name}`
    );
  }
  await ClientAdminRepository.createClientAdmin(newClientAdmin);
};
