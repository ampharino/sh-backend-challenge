import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { getCompanies, createCompany } from './service';
import { CompanySchema } from './validator';
import { BusinessLogicError } from '../errors';

export const getCompaniesHandler = async (req: Request, res: Response) => {
  const companies = await getCompanies();
  res.status(200).json(companies);
};

export const createCompaniesHandler = async (req: Request, res: Response) => {
  try {
    const newCompany = CompanySchema.parse({ body: req.body }).body;
    await createCompany(newCompany);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.errors);
    } else if (error instanceof BusinessLogicError) {
      res.status(400).send({ message: error.message });
    } else {
      res.sendStatus(500);
    }
  }
};
