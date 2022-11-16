import { z } from 'zod';

export const CompanySchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
  }),
});
