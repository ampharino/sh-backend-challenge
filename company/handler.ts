import { ZodError } from 'zod';
import { Request, Response } from 'express';
import * as CompanyService from './service';
import * as CompanyValidators from './validator';
import {
  AuthorizationError,
  BusinessLogicError,
  NotFoundError,
} from '../errors';

export const getCompaniesHandler = async (req: Request, res: Response) => {
  const companies = await CompanyService.getCompanies();
  res.status(200).json(companies);
};

export const createCompaniesHandler = async (req: Request, res: Response) => {
  try {
    const newCompany = CompanyValidators.CreateCompanySchema.parse({
      body: req.body,
    }).body;
    await CompanyService.createCompany(newCompany);
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

export const createClientAdminHandler = async (req: Request, res: Response) => {
  try {
    const validatedRequest =
      CompanyValidators.CreateClientAdminSchema.parse(req);
    await CompanyService.createClientAdmin({
      name: validatedRequest.body.name,
      companyId: validatedRequest.params.companyId,
    });
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.errors);
    } else if (error instanceof BusinessLogicError) {
      res.status(400).send({ message: error.message });
    } else if (error instanceof NotFoundError) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
};

export const createEmployeeHandler = async (req: Request, res: Response) => {
  const clientAdminId = Number(req.header('clientAdminId'));
  if (!clientAdminId) {
    res.sendStatus(401);
    return;
  }
  try {
    const validatedRequest = CompanyValidators.CreateEmployeeSchema.parse(req);
    await CompanyService.createEmployee(
      {
        name: validatedRequest.body.name,
        employeeId: validatedRequest.body.employeeId,
        companyId: validatedRequest.params.companyId,
      },
      clientAdminId
    );
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.errors);
    } else if (error instanceof AuthorizationError) {
      res.sendStatus(403);
    } else if (error instanceof BusinessLogicError) {
      res.status(400).send({ message: error.message });
    } else if (error instanceof NotFoundError) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
};

export const getEmployeesHandler = async (req: Request, res: Response) => {
  const clientAdminId = Number(req.header('clientAdminId'));
  if (!clientAdminId) {
    res.sendStatus(401);
    return;
  }
  try {
    const { companyId } =
      CompanyValidators.GetEmployeesSchema.parse(req).params;
    const employees = await CompanyService.getEmployees(
      companyId,
      clientAdminId
    );
    res.status(200).json(employees);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.errors);
    } else if (error instanceof AuthorizationError) {
      res.sendStatus(403);
    } else if (error instanceof BusinessLogicError) {
      res.status(400).send({ message: error.message });
    } else if (error instanceof NotFoundError) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
};

export const importEmployeesHandler = async (req: Request, res: Response) => {
  const clientAdminId = Number(req.header('clientAdminId'));
  if (!clientAdminId) {
    res.sendStatus(401);
    return;
  }
  try {
    const validatedRequest = CompanyValidators.ImportEmployeesSchema.parse(req);
    const result = await CompanyService.importEmployees(
      validatedRequest.body,
      validatedRequest.params.companyId,
      clientAdminId
    );
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.errors);
    } else if (error instanceof AuthorizationError) {
      res.sendStatus(403);
    } else if (error instanceof BusinessLogicError) {
      res.status(400).send({ message: error.message });
    } else if (error instanceof NotFoundError) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
};
