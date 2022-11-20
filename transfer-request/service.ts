import { EmployeeRepository } from '../employee/repository';
import {
  AuthorizationError,
  BusinessLogicError,
  REQUEST_LIMIT_EXCEED,
} from '../errors';
import { TransferRequestRepository } from './repository';

const calculateTotalRequestsForMonth = async (employeeId: number) => {
  const result = await TransferRequestRepository.getRequestsForCurrentMonth(
    employeeId
  );
  let totalForMonth = 0;
  result.forEach(
    (request) => (totalForMonth += Number(request.dataValues.amount))
  );
  return totalForMonth;
};

export const createTransferRequest = async (
  amount: number,
  employeeId: number
) => {
  const employee = await EmployeeRepository.findEmployeeByPk(employeeId);
  if (!employee) {
    throw new AuthorizationError();
  }
  const totalRequest =
    (await calculateTotalRequestsForMonth(employeeId)) + amount;
  if (totalRequest > Number(employee.dataValues.salary) * 0.5) {
    throw new BusinessLogicError(REQUEST_LIMIT_EXCEED);
  }
  await TransferRequestRepository.createTransferRequest(amount, employeeId);
  return { amount, totalRequest };
};
