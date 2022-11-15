import { getCompaniesHandler } from './handler';
import express from 'express';

const router = express.Router();

router.get('/', getCompaniesHandler);

export default router;
