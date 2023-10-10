"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const department_controller_1 = require("./department.controller");
const department_validation_1 = require("./department.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/create-department', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(department_validation_1.DepartmentValidation.create), department_controller_1.DepartmentController.insertIntoDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), department_controller_1.DepartmentController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), department_controller_1.DepartmentController.getDataById);
exports.DepartmentRoutes = router;
