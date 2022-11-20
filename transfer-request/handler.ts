import { ZodError } from 'zod';
import { CreateTransferRequestSchema } from './validator';
import { Request, Response } from 'express';
import { createTransferRequest } from './service';
import { AuthorizationError, BusinessLogicError } from '../errors';

export const createTransferRequestHandler = async (
  req: Request,
  res: Response
) => {
  const employeeId = Number(req.header('employeeId'));
  if (!employeeId) {
    res.sendStatus(401);
    return;
  }
  try {
    const { amount } = CreateTransferRequestSchema.parse(req).body;
    const result = await createTransferRequest(amount, employeeId);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(error.errors);
    } else if (error instanceof AuthorizationError) {
      res.sendStatus(401);
    } else if (error instanceof BusinessLogicError) {
      res.status(400).json({ message: error.message });
    } else {
      res.sendStatus(500);
    }
  }
};
