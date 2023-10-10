"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplainRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const complain_controller_1 = require("./complain.controller");
const complain_validation_1 = require("./complain.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/create-complain', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(complain_validation_1.ComplainValidation.create), complain_controller_1.ComplainController.insertIntoDB);
router.get('/:pbsCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), complain_controller_1.ComplainController.getAllFromDB);
router.patch('/:complainCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(complain_validation_1.ComplainValidation.update), complain_controller_1.ComplainController.getAllFromDB);
router.get('/complain/:complainCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), complain_controller_1.ComplainController.getDataById);
exports.ComplainRoutes = router;
