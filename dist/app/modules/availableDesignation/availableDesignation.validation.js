"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableDesignationValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        designationId: zod_1.z.string({
            required_error: 'designation  is required',
        }),
        zonalCode: zod_1.z.string({
            required_error: 'Zonal  is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        designationId: zod_1.z.string().optional(),
    }),
});
exports.AvailableDesignationValidation = {
    create,
    update,
};
