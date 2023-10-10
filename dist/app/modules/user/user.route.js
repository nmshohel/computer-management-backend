"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
router.post('/create-user', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.create), user_controller_1.UserController.insertIntoDB);
router.get('/:pbsCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), user_controller_1.UserController.getAllFromDB);
router.get('/user/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), user_controller_1.UserController.getDataById);
router.patch('/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.update), user_controller_1.UserController.updateIntoDB);
// ------------------------------
router.post('/pbs-posting-request/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN), user_controller_1.UserController.pbsPostingRequest);
router.get('/pbs-all-transfer-requested-user/:pbsCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN), user_controller_1.UserController.getAllPbsTransferRequestedUser);
router.post('/pbs-posting-request-approve/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN), user_controller_1.UserController.pbsPostingRequestApprove);
router.post('/pbs-posting-request-cancel/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN), user_controller_1.UserController.pbsPostingRequestCancel);
// -------------zonal
router.post('/zonal-posting-request', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.UserZonalTransferRequest), user_controller_1.UserController.zonalPostingRequest);
router.get('/zonal-all-transfer-requested-user/:pbsCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN), user_controller_1.UserController.getAllZonalTransferRequestedUser);
router.post('/zonal-posting-request-approve/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN), user_controller_1.UserController.zonalPostingRequestApprove);
router.post('/zonal-posting-request-cancel/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN), user_controller_1.UserController.zonalPostingRequestCancel);
exports.UserRoutes = router;
