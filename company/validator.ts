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
