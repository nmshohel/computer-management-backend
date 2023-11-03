"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name  is required',
        }),
        address: zod_1.z.string({
            required_error: 'address  is required',
        }),
        phone: zod_1.z.string({
            required_error: 'phone is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
    }),
});
exports.SupplierValidation = {
    create,
    update,
};
