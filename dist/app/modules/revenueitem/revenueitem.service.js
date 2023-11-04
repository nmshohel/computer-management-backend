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
exports.RevenueItemService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const revenueitem_constrant_1 = require("./revenueitem.constrant");
const inertIntoDB = (data, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    data.pbsCode = authUser.pbsCode;
    data.addByMobileNo = authUser.mobileNo;
    const revenueItem = yield prisma_1.default.revenueItem.findFirst({
        where: Object.assign({}, data)
    });
    if (revenueItem) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "revenue item already exists");
    }
    const result = prisma_1.default.revenueItem.create({
        data: data,
    });
    return result;
});
const assignToUserOrIdentificationNo = (data, authUser, id) => __awaiter(void 0, void 0, void 0, function* () {
    const capitalItem = yield prisma_1.default.capitalItem.findUnique({
        where: {
            identificationNo: data.identificationNo,
        },
        include: {
            issueBy: true,
            addBy: true,
            assignTo: true,
        },
    });
    if (!(capitalItem === null || capitalItem === void 0 ? void 0 : capitalItem.identificationNo)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Identification No not found');
    }
    const result = prisma_1.default.revenueItem.update({
        where: {
            id: id,
        },
        data: {
            issueByMobileNo: authUser === null || authUser === void 0 ? void 0 : authUser.mobileNo,
            zonalCode: data.zonalCode,
            assignToMobileNo: data.assignToMobileNo,
            identificationNo: data.identificationNo,
        },
    });
    return result;
});
const createReveivedByUser = (authUser, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.revenueItem.update({
        where: {
            id: id,
        },
        data: {
            receivedByMobileNo: authUser === null || authUser === void 0 ? void 0 : authUser.mobileNo,
        },
    });
    return result;
});
const getAllFromDB = (filters, options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: revenueitem_constrant_1.RevenueItemSearchableFields.map(field => ({
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
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.revenueItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, activeOrcondemnationStatus: 'a' }),
        skip,
        take: limit,
        include: {
            model: true,
            brand: true,
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            itemType: true,
            category: true,
            subCategory: true,
            supplier: true,
            issueBy: true,
            addBy: true,
            approveBy: true,
            assignTo: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.revenueItem.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllAssignPending = (filters, options, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('from assign to adn');
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: revenueitem_constrant_1.RevenueItemSearchableFields.map(field => ({
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
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.revenueItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { assignToMobileNo: null, 
            // receivedByMobileNo: null,
            activeOrcondemnationStatus: 'a' }),
        skip,
        take: limit,
        include: {
            model: true,
            brand: true,
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            itemType: true,
            category: true,
            subCategory: true,
            supplier: true,
            issueBy: true,
            addBy: true,
            approveBy: true,
            assignTo: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    console.log('result', 'result');
    const total = yield prisma_1.default.revenueItem.count({
        where: {
            assignToMobileNo: authUser === null || authUser === void 0 ? void 0 : authUser.mobileNo,
            receivedByMobileNo: null,
            activeOrcondemnationStatus: 'a',
        },
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllReceivePending = (filters, options, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('from assign to adn');
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: revenueitem_constrant_1.RevenueItemSearchableFields.map(field => ({
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
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.revenueItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { assignToMobileNo: authUser === null || authUser === void 0 ? void 0 : authUser.mobileNo, receivedByMobileNo: null, activeOrcondemnationStatus: 'a' }),
        skip,
        take: limit,
        include: {
            model: true,
            brand: true,
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            itemType: true,
            category: true,
            subCategory: true,
            supplier: true,
            issueBy: true,
            addBy: true,
            approveBy: true,
            assignTo: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    console.log('result', 'result');
    const total = yield prisma_1.default.revenueItem.count({
        where: {
            assignToMobileNo: authUser === null || authUser === void 0 ? void 0 : authUser.mobileNo,
            receivedByMobileNo: null,
            activeOrcondemnationStatus: 'a',
        },
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllFromDBReveivedBy = (filters, options, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('from assign to adn');
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: revenueitem_constrant_1.RevenueItemSearchableFields.map(field => ({
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
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.revenueItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { receivedByMobileNo: authUser === null || authUser === void 0 ? void 0 : authUser.mobileNo, activeOrcondemnationStatus: 'a' }),
        skip,
        take: limit,
        include: {
            model: true,
            brand: true,
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            itemType: true,
            category: true,
            subCategory: true,
            supplier: true,
            issueBy: true,
            addBy: true,
            approveBy: true,
            assignTo: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    console.log('result', 'result');
    const total = yield prisma_1.default.revenueItem.count({
        where: {
            receivedByMobileNo: authUser === null || authUser === void 0 ? void 0 : authUser.mobileNo,
        },
    });
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
    const result = yield prisma_1.default.revenueItem.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.revenueItem.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
exports.RevenueItemService = {
    inertIntoDB,
    getAllFromDB,
    getDataById,
    updateIntoDB,
    assignToUserOrIdentificationNo,
    // getAllFromDBByAssignToAndReceivePending,
    getAllReceivePending,
    getAllAssignPending,
    createReveivedByUser,
    getAllFromDBReveivedBy,
};
