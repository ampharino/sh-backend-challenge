import sequelize from '../database';
import Employee from './model';

export const EmployeeRepository = {
  createEmployee: async (newEmployee: {
    name: string;
    companyId: number;
    employeeId: number;
    salary: number;
  }) => {
    await Employee.create(newEmployee);
  },
  findEmployeeByPk: async (id: number) => {
    return await Employee.findByPk(id);
  },
  findEmployeeById: async (employeeId: number, companyId: number) => {
    return await Employee.findOne({ where: { employeeId, companyId } });
  },
  getEmployeesForCompany: async (companyId: number) => {
    return await Employee.findAndCountAll({ where: { companyId } });
  },
  createOrUpdateEmployees: async (
    employees: {
      salary: number;
      name: string;
      employeeId: number;
      companyId: number;
    }[]
  ) => {
    // * Unfortunately for Postgres upsert function does not return whether a record was updated or created so we have to track it ourselves
    const countPromises = employees.map((employee) =>
      EmployeeRepository.findEmployeeById(
        employee.employeeId,
        employee.companyId
      )
    );
    const countResult = await Promise.all(countPromises);
    const createdCount = countResult.filter((result) => !result).length;
    const updatedCount = employees.length - createdCount;

    await sequelize.transaction(async (t) => {
      const upsertPromises = employees.map((employee) => {
        return Employee.upsert(employee, {
          fields: ['name', 'salary'],
          transaction: t,
        });
      });
      await Promise.all(upsertPromises);
    });
    return { created: createdCount, updated: updatedCount };
  },
};
