import { z } from 'zod';

const update = z.object({
  body: z.object({
    phone: z.string().optional(),
    address: z.string().optional(),
    trgId: z.string().optional(),
    photoUrl: z.string().optional(),
    signUrl: z.string().optional(),
  }),
});

export const EmployeeValidation = {
  update,
};
