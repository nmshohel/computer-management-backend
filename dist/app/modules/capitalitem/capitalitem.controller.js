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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalItemController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const capitalitem_constrant_1 = require("./capitalitem.constrant");
const capitalitem_service_1 = require("./capitalitem.service");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user;
    console.log(user);
    const result = yield capitalitem_service_1.CapitalItemService.inertIntoDB(req.body, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CapitalItem Created Successfully',
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.id;
    const filters = (0, pick_1.default)(req.query, capitalitem_constrant_1.capitalItemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield capitalitem_service_1.CapitalItemService.getAllFromDB(filters, options, pbsCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CapitalItem data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const getAllNotAssignFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.id;
    const filters = (0, pick_1.default)(req.query, capitalitem_constrant_1.capitalItemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield capitalitem_service_1.CapitalItemService.getAllNotAssignFromDB(filters, options, pbsCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Not Assign CapitalItem data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const getAllNotApproveFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.id;
    const filters = (0, pick_1.default)(req.query, capitalitem_constrant_1.capitalItemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield capitalitem_service_1.CapitalItemService.getAllNotApproveFromDB(filters, options, pbsCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Not Approved CapitalItem data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const getAllNotCertifyFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.id;
    const filters = (0, pick_1.default)(req.query, capitalitem_constrant_1.capitalItemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield capitalitem_service_1.CapitalItemService.getAllNotCertifyFromDB(filters, options, pbsCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Not Certify CapitalItem data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const getAllNotReceiveFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.id;
    const filters = (0, pick_1.default)(req.query, capitalitem_constrant_1.capitalItemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield capitalitem_service_1.CapitalItemService.getAllNotReveiveFromDB(filters, options, pbsCode, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Not Receive CapitalItem data fatched',
        meta: result.meta,
        data: result.data,
    });
}));
const getDataById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield capitalitem_service_1.CapitalItemService.getDataById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CapitalItem data fatched',
        data: result,
    });
}));
const updateIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield capitalitem_service_1.CapitalItemService.updateIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Capital item Updated Successfully',
        data: result,
    });
}));
const insertAssignToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield capitalitem_service_1.CapitalItemService.insertAssignToDB(req.user, req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Assign Successfully',
        data: result,
    });
}));
const insertApproveToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authUserMobileNo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.mobileNo;
    const result = yield capitalitem_service_1.CapitalItemService.insertApproveToDB(authUserMobileNo, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Approved Successfully',
        data: result,
    });
}));
const insertcertifyToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const authUserMobileNo = (_b = req.user) === null || _b === void 0 ? void 0 : _b.mobileNo;
    const result = yield capitalitem_service_1.CapitalItemService.insertCertifyToDB(authUserMobileNo, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Certify Successfully',
        data: result,
    });
}));
const insertReceiveToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const authUserMobileNo = (_c = req.user) === null || _c === void 0 ? void 0 : _c.mobileNo;
    const result = yield capitalitem_service_1.CapitalItemService.insertReceiveToDB(authUserMobileNo, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Receive Successfully',
        data: result,
    });
}));
const getAllFromDBByAssignTo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pbsCode = req.params.id;
    const filters = (0, pick_1.default)(req.query, capitalitem_constrant_1.capitalItemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield capitalitem_service_1.CapitalItemService.getAllFromDBByAssignTo(filters, options, pbsCode, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Capital Item Fached',
        meta: result.meta,
        data: result.data,
    });
}));
exports.CapitalItemController = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateIntoDB,
    insertAssignToDB,
    getAllNotAssignFromDB,
    insertApproveToDB,
    getAllNotApproveFromDB,
    insertcertifyToDB,
    getAllNotCertifyFromDB,
    insertReceiveToDB,
    getAllNotReceiveFromDB,
    getAllFromDBByAssignTo,
};
