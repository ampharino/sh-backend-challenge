import { z } from 'zod';

export const EmployeeIdentitySchema = z
  .string()
  .regex(/\d+-\d+/)
  .transform((val) => val.split('-'));

export const CreateTransferRequestSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
  }),
});
