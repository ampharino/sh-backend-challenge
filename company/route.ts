import {
  getCompaniesHandler,
  createCompaniesHandler,
  createClientAdminHandler,
  createEmployeeHandler,
  getEmployeesHandler,
  importEmployeesHandler,
} from './handler';
import express from 'express';

const router = express.Router();

router.get('/', getCompaniesHandler);
router.post('/', createCompaniesHandler);
router.post('/:companyId/client-admin', createClientAdminHandler);
router.post('/:companyId/employee', createEmployeeHandler);
router.get('/:companyId/employee', getEmployeesHandler);
router.put('/:companyId/employee', importEmployeesHandler);

export default router;
