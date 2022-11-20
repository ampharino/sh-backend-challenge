import express from 'express';
import { createTransferRequestHandler } from './handler';

const router = express.Router();

router.post('/', createTransferRequestHandler);

export default router;
