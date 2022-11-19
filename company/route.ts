import * as CompanyHandlers from './handler';
import express from 'express';

const router = express.Router();

router.get('/', CompanyHandlers.getCompaniesHandler);
router.post('/', CompanyHandlers.createCompaniesHandler);
router.post(
  '/:companyId/client-admin',
  CompanyHandlers.createClientAdminHandler
);
router.post('/:companyId/employee', CompanyHandlers.createEmployeeHandler);
router.get('/:companyId/employee', CompanyHandlers.getEmployeesHandler);
router.put('/:companyId/employee', CompanyHandlers.importEmployeesHandler);

export default router;
