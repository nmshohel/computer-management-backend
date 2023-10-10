"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalItemValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        serialNo: zod_1.z.string({
            required_error: 'serialNo  is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        purchasedate: zod_1.z.string({
            required_error: 'purchasedate is required',
        }),
        price: zod_1.z.string({
            required_error: 'price is required',
        }),
        warranty: zod_1.z.string({
            required_error: 'warranty is required',
        }),
        modelId: zod_1.z.string({
            required_error: 'model is required',
        }),
        brandId: zod_1.z.string({
            required_error: 'brand is required',
        }),
        supplierId: zod_1.z.string({
            required_error: 'supplier is required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'category is required',
        }),
        subCategoryid: zod_1.z.string({
            required_error: 'sub Category is required',
        }),
        itemTypeId: zod_1.z.string({
            required_error: 'item type is required',
        }),
    }),
});
const createAssign = zod_1.z.object({
    body: zod_1.z.object({
        assignTo: zod_1.z.string({
            required_error: 'Assign Employee is required',
        }),
        zonalCode: zod_1.z.string({
            required_error: 'zonal Code is required',
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
exports.CapitalItemValidation = {
    create,
    update,
    createAssign,
};
