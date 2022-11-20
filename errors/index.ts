export class BusinessLogicError extends Error {}

export class AuthorizationError extends Error {}

export class NotFoundError extends Error {}

export const COMPANY_ALREADY_EXIST = 'Company with that name already exists';
export const CLIENT_ADMIN_ALREADY_EXIST = `There is already a client admin with the same name`;
export const EMPLOYEE_ALREADY_EXIST = `There is already an employee with the same id`;
export const REQUEST_LIMIT_EXCEED =
  'Total requested amount each month cannot exceed 50% of your salary';
