"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const availableDepartment_controller_1 = require("./availableDepartment.controller");
const availableDepartment_validation_1 = require("./availableDepartment.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(availableDepartment_validation_1.AvailableDepartmentValidation.create), availableDepartment_controller_1.AvailableDepartmentController.insertIntoDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), availableDepartment_controller_1.AvailableDepartmentController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), availableDepartment_controller_1.AvailableDepartmentController.getDataById);
router.patch('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(availableDepartment_validation_1.AvailableDepartmentValidation.update), availableDepartment_controller_1.AvailableDepartmentController.updateIntoDB);
exports.AvailableDepartmentRoutes = router;
