import {
  getCompaniesHandler,
  createCompaniesHandler,
  createClientAdminHandler,
} from './handler';
import express from 'express';

const router = express.Router();

router.get('/', getCompaniesHandler);
router.post('/', createCompaniesHandler);
router.post('/:companyId/client-admin', createClientAdminHandler);

export default router;
