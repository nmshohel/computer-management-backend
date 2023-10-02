import { z } from 'zod';

const create = z.object({
  body: z.object({
    serialNo: z.string({
      required_error: 'serialNo  is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    purchasedate: z.string({
      required_error: 'purchasedate is required',
    }),
    price: z.string({
      required_error: 'price is required',
    }),
    warranty: z.string({
      required_error: 'warranty is required',
    }),
    modelId: z.string({
      required_error: 'model is required',
    }),
    brandId: z.string({
      required_error: 'brand is required',
    }),
    supplierId: z.string({
      required_error: 'supplier is required',
    }),
    categoryId: z.string({
      required_error: 'category is required',
    }),
    subCategoryid: z.string({
      required_error: 'sub Category is required',
    }),
    itemTypeId: z.string({
      required_error: 'item type is required',
    }),
  }),
});
const createAssign = z.object({
  body: z.object({
    assignTo: z.string({
      required_error: 'Assign Employee is required',
    }),
    zonalCode: z.string({
      required_error: 'zonal Code is required',
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
export const CapitalItemValidation = {
  create,
  update,
  createAssign,
};
