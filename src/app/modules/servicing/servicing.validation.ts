import { z } from 'zod';

const create = z.object({
  body: z.object({
    servicingCost: z.string({
      required_error: 'Servicing Cost  is required',
    }),
    servicingDate: z.string({
      required_error: 'Servicing Date  is required',
    }),
    serviceByMobileNo: z.string({
      required_error: 'ServiceBy Mobile No is required',
    }),
    description: z.string({
      required_error: 'Description Mobile No is required',
    }),
    identificationNo: z.string({
      required_error: 'Identification No Mobile No is required',
    }),
    suplierId: z.string({
      required_error: 'SuplierId  is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    survicingCost: z.string().optional(),
    survicingDate: z.date().optional(),
    serviceByMobileNo: z.string().optional(),
    description: z.string().optional(),
    identificationNo: z.string().optional(),
    suplierId: z.string().optional(),
    revenueItemId: z.string().optional(),
  }),
});
export const ServicingValidation = {
  create,
  update,
};
