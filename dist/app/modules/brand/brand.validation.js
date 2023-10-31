"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        brandName: zod_1.z.string({
            required_error: 'Brand name code is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        brandName: zod_1.z.string().optional(),
    }),
});
exports.BrandValidation = {
    create, update
};
