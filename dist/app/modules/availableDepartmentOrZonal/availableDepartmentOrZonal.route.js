"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableDeptOrZonalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const availableDepartmentOrZonal_controller_1 = require("./availableDepartmentOrZonal.controller");
const availableDepartmentOrZonal_validation_1 = require("./availableDepartmentOrZonal.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(availableDepartmentOrZonal_validation_1.AvailableDeptOrZonalValidation.create), availableDepartmentOrZonal_controller_1.AvailableDeptOrZonalController.insertIntoDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), availableDepartmentOrZonal_controller_1.AvailableDeptOrZonalController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), availableDepartmentOrZonal_controller_1.AvailableDeptOrZonalController.getDataById);
router.patch('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(availableDepartmentOrZonal_validation_1.AvailableDeptOrZonalValidation.update), availableDepartmentOrZonal_controller_1.AvailableDeptOrZonalController.updateIntoDB);
exports.AvailableDeptOrZonalRoutes = router;
