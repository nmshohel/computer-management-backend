"use strict";
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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_constrant_1 = require("./user.constrant");
const user_service_1 = require("./user.service");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body,"body")
    const _a = req.body, { name, designationId, departmentId } = _a, others = __rest(_a, ["name", "designationId", "departmentId"]);
    const result = yield user_service_1.UserService.inertIntoDB(name, designationId, departmentId, others);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Created Successfully',
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.pbsCode;
    const filters = (0, pick_1.default)(req.query, user_constrant_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield user_service_1.UserService.getAllFromDB(filters, options, pbsCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const getDataById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mobileNo = req.params.mobileNo;
    const result = yield user_service_1.UserService.getDataById(mobileNo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User data fatched',
        data: result,
    });
}));
const updateIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNo } = req.params;
    const payload = req.body;
    const result = yield user_service_1.UserService.updateIntoDB(mobileNo, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Updated Successfully',
        data: result,
    });
}));
const pbsPostingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMobileNo = req.params.mobileNo;
    const result = yield user_service_1.UserService.pbsPostingRequest(req.user, userMobileNo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'PBS Transfer Request Successfully',
        data: result,
    });
}));
const getAllPbsTransferRequestedUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.pbsCode;
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield user_service_1.UserService.getAllPbsTransferRequestedUser(options, pbsCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Transfer Requested data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const pbsPostingRequestApprove = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMobileNo = req.params.mobileNo;
    const result = yield user_service_1.UserService.pbsPostingRequestApprove(req.user, userMobileNo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'PBS Transfer Request Approve Successfully',
        data: result,
    });
}));
const pbsPostingRequestCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMobileNo = req.params.mobileNo;
    const result = yield user_service_1.UserService.pbsPostingRequestCancel(req.user, userMobileNo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'PBS Transfer Request Cancel Successfully',
        data: result,
    });
}));
const zonalPostingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.zonalPostingRequest(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Zonal Transfer Request Successfully',
        data: result,
    });
}));
const getAllZonalTransferRequestedUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.pbsCode;
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield user_service_1.UserService.getAllZonalTransferRequestedUser(options, pbsCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Transfer Requested data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const zonalPostingRequestApprove = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMobileNo = req.params.mobileNo;
    const result = yield user_service_1.UserService.zonalPostingRequestApprove(req.user, userMobileNo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Zonal Transfer Request Approve Successfully',
        data: result,
    });
}));
const zonalPostingRequestCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMobileNo = req.params.mobileNo;
    const result = yield user_service_1.UserService.zonalPostingRequestCancel(req.user, userMobileNo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Zonal Transfer Request Cancel Successfully',
        data: result,
    });
}));
exports.UserController = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateIntoDB,
    pbsPostingRequest,
    pbsPostingRequestApprove,
    pbsPostingRequestCancel,
    getAllPbsTransferRequestedUser,
    zonalPostingRequest,
    getAllZonalTransferRequestedUser,
    zonalPostingRequestApprove,
    zonalPostingRequestCancel,
};
