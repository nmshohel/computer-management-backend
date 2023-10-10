"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeValidation = void 0;
const zod_1 = require("zod");
const update = zod_1.z.object({
    body: zod_1.z.object({
        designation: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        trgId: zod_1.z.string().optional(),
        photoUrl: zod_1.z.string().optional(),
        signUrl: zod_1.z.string().optional(),
    }),
});
exports.EmployeeValidation = {
    update,
};
