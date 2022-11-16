import { getCompaniesHandler, createCompaniesHandler } from './handler';
import express from 'express';

const router = express.Router();

router.get('/', getCompaniesHandler);
router.post('/', createCompaniesHandler);

export default router;
