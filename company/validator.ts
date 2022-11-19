import { z } from 'zod';

export const CompanySchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
  }),
});

export const ClientAdminSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
  }),
  params: z.object({
    companyId: z.preprocess((a) => Number(a), z.number().positive()),
  }),
});

export const EmployeeSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    employeeId: z.number().positive(),
  }),
  params: z.object({
    companyId: z.preprocess((a) => Number(a), z.number().positive()),
  }),
});
