import {
  getCompaniesHandler,
  createCompaniesHandler,
  createClientAdminHandler,
  createEmployeeHandler,
  getEmployeesHandler,
} from './handler';
import express from 'express';

const router = express.Router();

router.get('/', getCompaniesHandler);
router.post('/', createCompaniesHandler);
router.post('/:companyId/client-admin', createClientAdminHandler);
router.post('/:companyId/employee', createEmployeeHandler);
router.get('/:companyId/employee', getEmployeesHandler);

export default router;
