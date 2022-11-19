import Employee from './model';

export const EmployeeRepository = {
  createEmployee: async (newCompany: {
    name: string;
    companyId: number;
    employeeId: number;
  }) => {
    await Employee.create(newCompany);
  },
  findEmployeeById: async (employeeId: number, companyId: number) => {
    return await Employee.findOne({ where: { employeeId, companyId } });
  },
};
