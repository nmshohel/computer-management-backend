"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZonalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const zonal_controller_1 = require("./zonal.controller");
const zonal_validation_1 = require("./zonal.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/create-zonal', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(zonal_validation_1.ZonalValidation.create), zonal_controller_1.ZonalController.insertIntoDB);
router.get('/:pbsCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), zonal_controller_1.ZonalController.getAllFromDB);
router.get('/zonal/:zonalCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), zonal_controller_1.ZonalController.getDataById);
router.patch('/:zonalCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(zonal_validation_1.ZonalValidation.update), zonal_controller_1.ZonalController.updateIntoDB);
exports.ZonalRoutes = router;
