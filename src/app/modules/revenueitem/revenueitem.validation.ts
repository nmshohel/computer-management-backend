import { z } from 'zod';

const create = z.object({
  body: z.object({
    description: z.string({
      required_error: 'description is required',
    }),
    purchasedate: z.string({
      required_error: 'purchasedate is required',
    }),
    price: z.string({
      required_error: 'price is required',
    }),
    supplierId: z.string({
      required_error: 'supplier is required',
    }),
    itemTypeId: z.string({
      required_error: 'itemType is required',
    }),
    categoryId: z.string({
      required_error: 'category is required',
    }),
    subCategoryid: z.string({
      required_error: 'sub Category is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    serialNo: z.string().optional(),
    description: z.string().optional(),
    purchasedate: z.string().optional(),
    price: z.string().optional(),
    warranty: z.string().optional(),
    identificationNo: z.string().optional(),
    status: z.string().optional(),
  }),
});

const assign = z.object({
  body: z.object({
    identificationNo: z.string({
      required_error: 'identification No is required',
    }),
    assignToMobileNo: z.string({
      required_error: 'assign employee is required',
    }),
  }),
});
export const RevenueItemValidation = {
  create,
  update,
  assign,
};
