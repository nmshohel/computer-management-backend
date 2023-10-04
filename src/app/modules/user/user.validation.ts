import { z } from 'zod';

const create = z.object({
  body: z.object({
    mobileNo: z.string({
      required_error: 'mobileNo code is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    password: z.string({
      required_error: 'password name is required',
    }),
    designation: z.string({
      required_error: 'designation is required',
    }),
    pbsCode: z.string({
      required_error: 'pbsCode code is required',
    }),
    zonalCode: z.string().optional(),
    substationCode: z.string().optional(),
    complainCode: z.string().optional(),
  }),
});
const update = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    pbsCode: z.string().optional(),
    zonalCode: z.string().optional(),
    substationCode: z.string().optional(),
    complainCode: z.string().optional(),
  }),
});
const UserTransferRequstOrApproveOrCancle = z.object({
  body: z.object({
    mobileNo: z.string({
      required_error: 'Mobile No Number is required',
    }),
  }),
});
const UserZonalTransferRequest = z.object({
  body: z.object({
    mobileNo: z.string({
      required_error: 'Mobile No Number is required',
    }),
    zonalCode: z.string({
      required_error: 'Zonal Code is required',
    }),
  }),
});
export const UserValidation = {
  create,
  update,
  UserTransferRequstOrApproveOrCancle,
  UserZonalTransferRequest,
};
