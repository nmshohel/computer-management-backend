"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueItemValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        purchasedate: zod_1.z.string({
            required_error: 'purchasedate is required',
        }),
        price: zod_1.z.string({
            required_error: 'price is required',
        }),
        supplierId: zod_1.z.string({
            required_error: 'supplier is required',
        }),
        itemTypeId: zod_1.z.string({
            required_error: 'itemType is required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'category is required',
        }),
        subCategoryid: zod_1.z.string({
            required_error: 'sub Category is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        serialNo: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        purchasedate: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        warranty: zod_1.z.string().optional(),
        identificationNo: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
    }),
});
const assign = zod_1.z.object({
    body: zod_1.z.object({
        identificationNo: zod_1.z.string({
            required_error: 'identification No is required',
        }),
        assignToMobileNo: zod_1.z.string({
            required_error: 'assign employee is required',
        }),
    }),
});
exports.RevenueItemValidation = {
    create,
    update,
    assign,
};
