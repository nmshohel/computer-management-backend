import { z } from 'zod';

const create = z.object({
  body: z.object({
    departmentId: z.string({
      required_error: 'department  is required',
    }),
    zonalCode: z.string({
      required_error: 'Zonal is required',
    })
  }),
});
const update = z.object({
  body: z.object({
    departmentId: z.string().optional(),
  }),
});

export const AvailableDepartmentValidation = {
  create,
  update,
};
