import { ClientAdminRepository } from '../client-admin/repository';
import { EmployeeRepository } from '../employee/repository';
import {
  AuthorizationError,
  BusinessLogicError,
  CLIENT_ADMIN_ALREADY_EXIST,
  COMPANY_ALREADY_EXIST,
  EMPLOYEE_ALREADY_EXIST,
  NotFoundError,
} from '../errors';
import { CompanyRepository } from './repository';

export const getCompanies = async () => {
  return await CompanyRepository.getAllCompanies();
};

export const createCompany = async (newCompany: { name: string }) => {
  if (await CompanyRepository.findCompanyByName(newCompany.name)) {
    throw new BusinessLogicError(COMPANY_ALREADY_EXIST);
  }
  return await CompanyRepository.createCompany(newCompany);
};

export const createClientAdmin = async (newClientAdmin: {
  name: string;
  companyId: number;
}) => {
  const { name, companyId } = newClientAdmin;
  if (!(await CompanyRepository.findCompanyById(companyId))) {
    throw new NotFoundError();
  }
  if (await ClientAdminRepository.getClientAdminByName(name, companyId)) {
    throw new BusinessLogicError(CLIENT_ADMIN_ALREADY_EXIST);
  }
  await ClientAdminRepository.createClientAdmin(newClientAdmin);
};

export const createEmployee = async (
  newEmployee: {
    name: string;
    employeeId: number;
    companyId: number;
    salary: number;
  },
  clientAdminId: number
) => {
  const { employeeId, companyId } = newEmployee;
  if (!(await CompanyRepository.findCompanyById(companyId))) {
    throw new NotFoundError();
  }
  if (
    !(await ClientAdminRepository.getClientAdminById(clientAdminId, companyId))
  ) {
    throw new AuthorizationError();
  }
  if (await EmployeeRepository.findEmployeeById(employeeId, companyId)) {
    throw new BusinessLogicError(EMPLOYEE_ALREADY_EXIST);
  }
  await EmployeeRepository.createEmployee(newEmployee);
};

export const getEmployees = async (
  companyId: number,
  clientAdminId: number
) => {
  if (!(await CompanyRepository.findCompanyById(companyId))) {
    throw new NotFoundError();
  }
  if (
    !(await ClientAdminRepository.getClientAdminById(clientAdminId, companyId))
  ) {
    throw new AuthorizationError();
  }
  return await EmployeeRepository.getEmployeesForCompany(companyId);
};

export const importEmployees = async (
  employees: { name: string; employeeId: number; salary: number }[],
  companyId: number,
  clientAdminId: number
) => {
  if (!(await CompanyRepository.findCompanyById(companyId))) {
    throw new NotFoundError();
  }
  if (
    !(await ClientAdminRepository.getClientAdminById(clientAdminId, companyId))
  ) {
    throw new AuthorizationError();
  }
  const employeesToImport = employees.map((employee) => ({
    ...employee,
    companyId,
  }));
  return await EmployeeRepository.createOrUpdateEmployees(employeesToImport);
};
