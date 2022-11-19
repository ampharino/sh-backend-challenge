import { z } from 'zod';

export const CreateCompanySchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
  }),
});

export const CreateClientAdminSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
  }),
  params: z.object({
    companyId: z.preprocess((a) => Number(a), z.number().positive()),
  }),
});

export const CreateEmployeeSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    employeeId: z.number().positive(),
  }),
  params: z.object({
    companyId: z.preprocess((a) => Number(a), z.number().positive()),
  }),
});

export const GetEmployeesSchema = z.object({
  params: z.object({
    companyId: z.preprocess((a) => Number(a), z.number().positive()),
  }),
});

export const ImportEmployeesSchema = z.object({
  body: z.array(
    z.object({
      name: z.string().trim().min(1),
      employeeId: z.number().positive(),
    })
  ),
  params: z.object({
    companyId: z.preprocess((a) => Number(a), z.number().positive()),
  }),
});
