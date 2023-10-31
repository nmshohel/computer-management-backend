"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        modelName: zod_1.z.string({
            required_error: 'model name code is required',
        }),
        brandId: zod_1.z.string({
            required_error: 'brand Id name is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        modelName: zod_1.z.string().optional(),
    }),
});
exports.ModelValidation = {
    create, update
};
