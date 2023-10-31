import { z } from 'zod';

const create = z.object({
  body: z.object({
    brandName: z.string({
      required_error: 'Brand name code is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    brandName: z.string().optional(),
  }),
});

export const BrandValidation = {
  create,update
};
