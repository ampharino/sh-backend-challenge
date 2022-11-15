import { Request, Response } from 'express';
import { getCompanies } from './service';

export const getCompaniesHandler = async (req: Request, res: Response) => {
  const companies = await getCompanies();
  res.status(200).json(companies);
};
