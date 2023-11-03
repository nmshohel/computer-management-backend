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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constrant_1 = require("./user.constrant");
const inertIntoDB = (name, designationId, data) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    // console.log("data", data)
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        data.password = yield bcrypt_1.default.hash(data.password, Number(config_1.default.bycrypt_salt_rounds));
        result = yield tx.user.create({
            data: data,
            include: {
                requestBy: true,
                requestePBS: true,
                requesteZonal: true,
                zonalTransferRequestByUser: true,
                pbs: true,
                zonals: true,
                complainCenter: true,
                substation: true
            }
        });
        yield tx.employee.create({
            data: {
                mobileNo: result.mobileNo,
                name: name,
                designationId: designationId,
            },
        });
    }));
    return result;
});
const getAllFromDB = (filters, options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_constrant_1.userSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.user.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode }),
        skip,
        take: limit,
        include: {
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            employee: {
                include: {
                    designation: {
                        include: {
                            department: true
                        }
                    }
                }
            },
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.user.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getDataById = (mobileNo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            mobileNo: mobileNo,
        },
        include: {
            employee: true,
            pbs: true,
            requestBy: true,
            requestePBS: true,
            zonals: true,
            requesteZonal: true,
        },
    });
    return result;
});
const updateIntoDB = (mobileNo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            mobileNo: mobileNo,
        },
        data: payload,
    });
    return result;
});
const pbsPostingRequest = (authUser, mobileNo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.user.update({
        where: {
            mobileNo: mobileNo,
        },
        data: {
            pbsTransferStatus: true,
            pbsTransferRequestBy: authUser.mobileNo,
            pbsTransferRequestedPbsCode: authUser.pbsCode,
            pbsTransferRequestDate: new Date(),
        },
        include: {
            pbs: true,
            employee: true,
            requestBy: true,
            requestePBS: true,
        },
    });
    const requestedUser = yield result;
    console.log('requestedUser', requestedUser);
    return result;
});
const getAllPbsTransferRequestedUser = (options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const result = yield prisma_1.default.user.findMany({
        where: {
            pbsTransferStatus: true,
            pbsCode: pbsCode,
        },
        skip,
        take: limit,
        include: {
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            employee: true,
            requestBy: true,
            requestePBS: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.user.count({
        where: {
            pbsTransferStatus: true,
            pbsCode: pbsCode,
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
const pbsPostingRequestApprove = (authUser, userMobileNo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('authUser', authUser);
    const requestedUser = yield prisma_1.default.user.findUnique({
        where: {
            mobileNo: userMobileNo,
        },
    });
    if (!(requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.pbsTransferRequestedPbsCode)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Employee Not Found');
    }
    const result = prisma_1.default.user.update({
        where: {
            mobileNo: userMobileNo,
        },
        include: {
            requestePBS: true,
            requestBy: true,
        },
        data: {
            pbsTransferStatus: false,
            pbsTranferApprovedBy: authUser.mobileNo,
            pbsCode: requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.pbsTransferRequestedPbsCode,
            pbsTranferApprovedDate: new Date(),
            zonalCode: null,
            substationCode: null,
            complainCode: null,
        },
    });
    return result;
});
const pbsPostingRequestCancel = (authUser, userMobileNo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('authUser', authUser);
    const result = prisma_1.default.user.update({
        where: {
            mobileNo: userMobileNo,
        },
        data: {
            pbsTransferStatus: false,
            pbsTranferCancelBy: authUser.mobileNo,
            pbsTranferCancelDate: new Date(),
        },
    });
    return result;
});
const zonalPostingRequest = (authUser, bodyData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.user.update({
        where: {
            mobileNo: bodyData.mobileNo,
        },
        data: {
            zonalTransferStatus: true,
            requestedZonalCode: bodyData.zonalCode,
            zonalTransferRequestBy: authUser.mobileNo,
            zonalTransferRequestDate: new Date(),
        },
        include: {
            zonals: true,
            pbs: true,
            requesteZonal: true,
            zonalTransferRequestByUser: true,
        },
    });
    return result;
});
const getAllZonalTransferRequestedUser = (options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const result = yield prisma_1.default.user.findMany({
        where: {
            zonalTransferStatus: true,
            pbsCode: pbsCode,
        },
        skip,
        take: limit,
        include: {
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            employee: true,
            requesteZonal: true,
            zonalTransferRequestByUser: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.user.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const zonalPostingRequestApprove = (authUser, userMobileNo) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            mobileNo: userMobileNo,
        },
    });
    console.log('existingUser', existingUser);
    const result = yield prisma_1.default.user.update({
        where: {
            mobileNo: userMobileNo,
        },
        data: {
            zonalTransferStatus: false,
            zonalTranferApprovedBy: authUser.mobileNo,
            zonalTranferApprovedDate: new Date(),
            zonalCode: existingUser === null || existingUser === void 0 ? void 0 : existingUser.requestedZonalCode,
        },
        include: {
            pbs: true,
            zonals: true,
            complainCenter: true,
            substation: true,
            employee: true,
            requesteZonal: true,
            zonalTransferRequestByUser: true,
        },
    });
    return result;
});
const zonalPostingRequestCancel = (authUser, userMobileNo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.user.update({
        where: {
            mobileNo: userMobileNo,
        },
        data: {
            zonalTransferStatus: false,
            zonalTranferCancelBy: authUser.mobileNo,
            zonalTranferCancelDate: new Date(),
            requestedZonalCode: null,
        },
    });
    return result;
});
exports.UserService = {
    inertIntoDB,
    getAllFromDB,
    getDataById,
    updateIntoDB,
    pbsPostingRequest,
    pbsPostingRequestApprove,
    pbsPostingRequestCancel,
    getAllPbsTransferRequestedUser,
    zonalPostingRequest,
    zonalPostingRequestApprove,
    zonalPostingRequestCancel,
    getAllZonalTransferRequestedUser,
};
