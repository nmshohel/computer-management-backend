"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicingValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        servicingCost: zod_1.z.string({
            required_error: 'Servicing Cost  is required',
        }),
        servicingDate: zod_1.z.string({
            required_error: 'Servicing Date  is required',
        }),
        serviceByMobileNo: zod_1.z.string({
            required_error: 'ServiceBy Mobile No is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description Mobile No is required',
        }),
        identificationNo: zod_1.z.string({
            required_error: 'Identification No Mobile No is required',
        }),
        suplierId: zod_1.z.string({
            required_error: 'SuplierId  is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        survicingCost: zod_1.z.string().optional(),
        survicingDate: zod_1.z.date().optional(),
        serviceByMobileNo: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        identificationNo: zod_1.z.string().optional(),
        suplierId: zod_1.z.string().optional(),
        revenueItemId: zod_1.z.string().optional(),
    }),
});
exports.ServicingValidation = {
    create,
    update,
};
