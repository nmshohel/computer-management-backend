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
exports.AvailableDepartmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const availableDepartment_constrant_1 = require("./availableDepartment.constrant");
const inertIntoDB = (data, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    data.pbsCode = pbsCode;
    const availableDepartment = yield prisma_1.default.availableDepartment.findFirst({
        where: {
            zonalCode: data === null || data === void 0 ? void 0 : data.zonalCode,
            departmentId: data === null || data === void 0 ? void 0 : data.departmentId
        },
        include: {
            zonal: true,
            department: true
        }
    });
    const zonalName = yield ((_a = availableDepartment === null || availableDepartment === void 0 ? void 0 : availableDepartment.zonal) === null || _a === void 0 ? void 0 : _a.zonalName);
    const departmentName = yield ((_b = availableDepartment === null || availableDepartment === void 0 ? void 0 : availableDepartment.department) === null || _b === void 0 ? void 0 : _b.departmentName);
    if (availableDepartment) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `${departmentName} department already exist for ${zonalName}`);
    }
    const result = prisma_1.default.availableDepartment.create({
        data: data,
        include: {
            pbs: true,
            zonal: true
        }
    });
    return result;
});
// get all supplier
const getAllFromDB = (filters, options, pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: availableDepartment_constrant_1.AvailableDepartmentSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.availableDepartment.findMany({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode }),
        skip,
        take: limit,
        include: {
            pbs: true,
            zonal: true,
            department: true
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.availableDepartment.count({
        where: Object.assign(Object.assign({}, whereCondition), { pbsCode: pbsCode }),
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
    const result = yield prisma_1.default.availableDepartment.findUnique({
        where: {
            id: id,
        },
        include: {
            pbs: true,
            zonal: true,
            department: true
        }
    });
    return result;
});
const availableAccessories = (pbsCode) => __awaiter(void 0, void 0, void 0, function* () {
    const allItem = yield prisma_1.default.capitalItem.findMany({
        where: {
            pbsCode: pbsCode,
            identificationNo: {
                not: null
            }
        },
        select: {
            zonalCode: true,
            identificationNo: true,
            assignTo: {
                select: {
                    employee: {
                        select: {
                            designation: {
                                select: {
                                    department: {
                                        select: {
                                            departmentName: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    });
    const scannersByZonalCode = {};
    allItem.forEach((item) => {
        const departmentName = item.assignTo.employee.designation.department.departmentName;
        const zonalCode = item.zonalCode;
        if (item.identificationNo.slice(6, -3) === "SCN" && departmentName && zonalCode) {
            // Check if the zonalCode exists in the laserPrintersByZonalCode object
            if (!scannersByZonalCode[zonalCode]) {
                scannersByZonalCode[zonalCode] = [];
            }
            const existingDepartment = scannersByZonalCode[zonalCode].find((printer) => printer[departmentName] !== undefined);
            if (existingDepartment) {
                existingDepartment[departmentName] = String(Number(existingDepartment[departmentName]) + 1);
            }
            else {
                const newDepartment = { [departmentName]: "01" };
                scannersByZonalCode[zonalCode].push(newDepartment);
            }
        }
    });
    //-------------------------------------------------------
    const laserPrintersByZonalCode = {};
    allItem.forEach((item) => {
        const departmentName = item.assignTo.employee.designation.department.departmentName;
        const zonalCode = item.zonalCode;
        if (item.identificationNo.slice(6, -3) === "PRN" && departmentName && zonalCode) {
            // Check if the zonalCode exists in the laserPrintersByZonalCode object
            if (!laserPrintersByZonalCode[zonalCode]) {
                laserPrintersByZonalCode[zonalCode] = [];
            }
            const existingDepartment = laserPrintersByZonalCode[zonalCode].find((printer) => printer[departmentName] !== undefined);
            if (existingDepartment) {
                existingDepartment[departmentName] = String(Number(existingDepartment[departmentName]) + 1);
            }
            else {
                const newDepartment = { [departmentName]: "01" };
                laserPrintersByZonalCode[zonalCode].push(newDepartment);
            }
        }
    });
    return {
        scanner: scannersByZonalCode,
        laserPrinter: laserPrintersByZonalCode
    };
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableDepartment.findUnique({
        where: {
            id: id,
        },
        include: {
            pbs: true,
            zonal: true
        }
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableDepartment.update({
        where: {
            id: id,
        },
        include: { pbs: true, zonal: true },
        data: payload,
    });
    return result;
});
exports.AvailableDepartmentService = {
    inertIntoDB,
    getAllFromDB,
    getDataById,
    deleteById,
    updateIntoDB,
    availableAccessories
};
