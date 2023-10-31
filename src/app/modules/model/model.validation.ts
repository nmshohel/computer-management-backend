import { z } from 'zod';

const create = z.object({
  body: z.object({
    modelName: z.string({
      required_error: 'model name code is required',
    }),
    brandId: z.string({
      required_error: 'brand Id name is required',
    }),
  }),
});


const update = z.object({
  body: z.object({
    modelName: z.string().optional(),
  }),
});
export const ModelValidation = {
  create,update
};
