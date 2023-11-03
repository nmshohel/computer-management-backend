import { z } from 'zod';

const create = z.object({
  body: z.object({
    designationId: z.string({
      required_error: 'designation  is required',
    }),
    zonalCode: z.string({
      required_error: 'Zonal  is required',
    }),

  }),
});
const update = z.object({
  body: z.object({
    designationId: z.string().optional(),

  }),
});

export const AvailableDesignationValidation = {
  create,
  update,
};
