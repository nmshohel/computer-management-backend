import { z } from 'zod';

const create = z.object({
  body: z.object({
    subCategoryName: z.string({
      required_error: 'sub Category Name is required',
    }),
    categoryId: z.string({
      required_error: 'Category id is required',
    }),
  }),
});

export const SubCategoryValidation = {
  create,
};
