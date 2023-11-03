"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableDeptOrZonalValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name  is required',
        })
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.AvailableDeptOrZonalValidation = {
    create,
    update,
};
