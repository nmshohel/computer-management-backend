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
exports.CapitalItemService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const capitalitem_constrant_1 = require("./capitalitem.constrant");
const inertIntoDB = (data, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    data.pbsCode = authUser.pbsCode;
    data.addByMobileNo = authUser.mobileNo;
    const isExist = yield prisma_1.default.capitalItem.findFirst({
        where: {
            brandId: data.brandId,
            serialNo: data.serialNo,
            modelId: data.modelId,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Capital item already exist');
    }
    const result = prisma_1.default.capitalItem.create({
        data: data,
        include: {
            model: true,
            brand: true,
            supplier: true,
            itemType: true,
            category: true,
            subCategory: true,
            pbs: true,
            addBy: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            issueBy: true,
            assignTo: true,
            approveBy: true,
            received: true,
            certifiedBy: true,
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
            OR: capitalitem_constrant_1.capitalItemSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.capitalItem.findMany({
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
            survicings: true,
            issueBy: {
                include: {
                    employee: true
                }
            },
            addBy: {
                include: {
                    employee: true
                }
            },
            approveBy: {
                include: {
                    employee: true
                }
            },
            assignTo: {
                include: {
                    employee: true
                }
            },
        },
        // orderBy:
        //   options.sortBy && options.sortOrder
        //     ? {
        //         [options.sortBy]: options.sortOrder,
        //       }
        //     : {
        //         zonalCode: 'desc',
        //       },
        orderBy: [{
                zonalCode: 'asc'
            },
            {
                assignToMobileNo: 'asc'
            }
        ]
    });
    const total = yield prisma_1.default.capitalItem.count({
        where: Object.assign(Object.assign({}, whereCondition), { activeOrcondemnationStatus: 'a', pbsCode: pbsCode }),
    });
    return {
        meta: {
            total: total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllNotAssignFromDB = (filters, options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: capitalitem_constrant_1.capitalItemSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.capitalItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, assignToMobileNo: null }),
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
    const total = yield prisma_1.default.capitalItem.count({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, assignToMobileNo: null }),
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
const getAllNotApproveFromDB = (filters, options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: capitalitem_constrant_1.capitalItemSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.capitalItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, approveByMobileNo: null }),
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
    const total = yield prisma_1.default.capitalItem.count({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, approveByMobileNo: null }),
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
const getAllNotCertifyFromDB = (filters, options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: capitalitem_constrant_1.capitalItemSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.capitalItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, certifiedByMobileNo: null }),
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
    const total = yield prisma_1.default.capitalItem.count({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, certifiedByMobileNo: null }),
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
const getAllNotReveiveFromDB = (filters, options, pbsCode, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    console.log(user);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: capitalitem_constrant_1.capitalItemSearchableFields.map(field => ({
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
    // const whereCondition: Prisma.CapitalItemWhereInput =
    //   andConditions.length > 0 ? { AND: andConditions } : {};
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.capitalItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, receivedByMobileNo: null, assignToMobileNo: user.mobileNo }),
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
    const total = yield prisma_1.default.capitalItem.count({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, receivedByMobileNo: null, assignToMobileNo: user.mobileNo }),
    });
    return {
        meta: {
            total: total,
            page,
            limit,
        },
        data: result,
    };
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.capitalItem.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const getDataByIdentificationNo = (identificationNo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("identificationNo", identificationNo);
    const result = yield prisma_1.default.capitalItem.findUnique({
        where: {
            identificationNo: identificationNo,
        },
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
            survicings: {
                include: {
                    serviceByuser: true,
                    supplier: true,
                }
            },
            revenueItem: {
                include: {
                    model: true,
                    brand: true,
                    itemType: true,
                    category: true,
                    subCategory: true,
                    supplier: true,
                    zonals: true,
                    addBy: {
                        include: {
                            employee: true
                        }
                    },
                    issueBy: {
                        include: {
                            employee: true
                        }
                    },
                    assignTo: {
                        include: {
                            employee: true
                        }
                    },
                    approveBy: {
                        include: {
                            employee: true
                        }
                    },
                }
            },
            issueBy: {
                include: {
                    employee: true
                }
            },
            addBy: {
                include: {
                    employee: true
                }
            },
            approveBy: {
                include: {
                    employee: true
                }
            },
            assignTo: {
                include: {
                    employee: true
                }
            },
        },
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.capitalItem.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const insertAssignToDB = (authUser, bodyData, id) => __awaiter(void 0, void 0, void 0, function* () {
    // for get item code
    const subCategoryDataFromDB = yield prisma_1.default.subCategory.findFirst({
        where: {
            capitalItem: {
                some: {
                    id: id,
                },
            },
        },
    });
    const currentzonal = yield prisma_1.default.capitalItem.findUnique({
        where: {
            id: id,
        },
    });
    // console.log('currentzonal');
    if ((currentzonal === null || currentzonal === void 0 ? void 0 : currentzonal.zonalCode) === bodyData.zonalCode) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already allocated Requested Office');
    }
    if (!(subCategoryDataFromDB === null || subCategoryDataFromDB === void 0 ? void 0 : subCategoryDataFromDB.itemCode) || !subCategoryDataFromDB) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'item code not found');
    }
    const allData = yield prisma_1.default.capitalItem.findMany({
        where: {
            subCategory: {
                itemCode: subCategoryDataFromDB === null || subCategoryDataFromDB === void 0 ? void 0 : subCategoryDataFromDB.itemCode,
            },
            pbsCode: authUser.pbsCode,
            zonalCode: bodyData.zonalCode,
        },
    });
    console.log('allData', allData);
    const allIdentificationNo = [];
    allData.map(element => {
        allIdentificationNo.push(element === null || element === void 0 ? void 0 : element.identificationNo);
    });
    const arrayOfIdentificationNoLastTwoDigit = [];
    allIdentificationNo.map((element) => {
        const num = parseInt(element.slice(-2));
        arrayOfIdentificationNoLastTwoDigit.push(num);
    });
    const maxNumber = Math.max(...arrayOfIdentificationNoLastTwoDigit);
    let identificationNo;
    const zonalOfficeCode = bodyData.zonalCode.toString().slice(-2);
    if (allIdentificationNo.length < 1) {
        identificationNo =
            authUser.pbsCode +
                '.' +
                zonalOfficeCode +
                '.' +
                (subCategoryDataFromDB === null || subCategoryDataFromDB === void 0 ? void 0 : subCategoryDataFromDB.itemCode) +
                '.' +
                '01';
    }
    else {
        identificationNo =
            authUser.pbsCode +
                '.' +
                zonalOfficeCode +
                '.' +
                (subCategoryDataFromDB === null || subCategoryDataFromDB === void 0 ? void 0 : subCategoryDataFromDB.itemCode) +
                '.' +
                (maxNumber < 9 ? '0' + (maxNumber + 1) : maxNumber + 1).toString();
    }
    const result = prisma_1.default.capitalItem.update({
        where: {
            id: id,
        },
        data: {
            assignToMobileNo: bodyData.assignTo,
            issueByMobileNo: authUser.mobileNo,
            zonalCode: bodyData.zonalCode,
            identificationNo: identificationNo,
        },
    });
    return result;
});
const insertApproveToDB = (AuthUserMobileNo, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.capitalItem.update({
        where: {
            id: id,
        },
        data: {
            approveByMobileNo: AuthUserMobileNo,
        },
    });
    return result;
});
const insertCertifyToDB = (AuthUserMobileNo, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.capitalItem.update({
        where: {
            id: id,
        },
        data: {
            certifiedByMobileNo: AuthUserMobileNo,
        },
    });
    return result;
});
const insertReceiveToDB = (AuthUserMobileNo, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.capitalItem.update({
        where: {
            id: id,
        },
        data: {
            receivedByMobileNo: AuthUserMobileNo,
        },
    });
    return result;
});
const getAllFromDBByAssignTo = (filters, options, pbsCode, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    console.log(user);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: capitalitem_constrant_1.capitalItemSearchableFields.map(field => ({
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
    // const whereCondition: Prisma.CapitalItemWhereInput =
    //   andConditions.length > 0 ? { AND: andConditions } : {};
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.capitalItem.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, receivedByMobileNo: user === null || user === void 0 ? void 0 : user.mobileNo }),
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
    const total = yield prisma_1.default.capitalItem.count({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode, receivedByMobileNo: user === null || user === void 0 ? void 0 : user.mobileNo }),
    });
    return {
        meta: {
            total: total,
            page,
            limit,
        },
        data: result,
    };
});
exports.CapitalItemService = {
    inertIntoDB,
    getAllFromDB,
    getDataById,
    updateIntoDB,
    insertAssignToDB,
    getAllNotAssignFromDB,
    insertApproveToDB,
    getAllNotApproveFromDB,
    insertCertifyToDB,
    getAllNotCertifyFromDB,
    insertReceiveToDB,
    getAllNotReveiveFromDB,
    getAllFromDBByAssignTo,
    getDataByIdentificationNo
};
