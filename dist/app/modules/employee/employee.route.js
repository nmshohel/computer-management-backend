"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const employee_controller_1 = require("./employee.controller");
const employee_validation_1 = require("./employee.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.get('/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), employee_controller_1.EmployeeController.getDataById);
router.patch('/:mobileNo', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(employee_validation_1.EmployeeValidation.update), employee_controller_1.EmployeeController.updateIntoDB);
exports.EmployeeRoutes = router;
