"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const servicing_constrant_1 = require("./servicing.constrant");
const inertIntoDB = (data, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const servicing = yield prisma_1.default.servicing.findFirst({
        where: Object.assign({}, data)
    });
    if (servicing) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "servicing already exists");
    }
    data.pbsCode = pbsCode;
    const result = prisma_1.default.servicing.create({
        data: data,
        include: {
            serviceByuser: true,
            capitalItems: true,
            supplier: true
        }
    });
    return result;
});
// get all supplier
const getAllFromDB = (filters, options, authUserPbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    // console.log(authUser)
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: servicing_constrant_1.survicingSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    // console.log("authUserPbsCode",authUserPbsCode)
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.servicing.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: authUserPbsCode }),
        include: { supplier: true, serviceByuser: true, capitalItems: true },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.servicing.count({ where: Object.assign(Object.assign({}, whereCondition), { pbsCode: authUserPbsCode }), });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.servicing.findUnique({
        where: {
            id: id,
        },
        include: { supplier: true, serviceByuser: true, capitalItems: true },
    });
    return result;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.servicing.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.servicing.update({
        where: {
            id: id,
        },
        include: { supplier: true, serviceByuser: true, capitalItems: true },
        data: payload,
    });
    return result;
});
exports.ServicingService = {
    inertIntoDB,
    getAllFromDB,
    getDataById,
    deleteById,
    updateIntoDB,
};
