"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const model_controller_1 = require("./model.controller");
const model_validation_1 = require("./model.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/create-model', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(model_validation_1.ModelValidation.create), model_controller_1.ModelController.insertIntoDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), model_controller_1.ModelController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), model_controller_1.ModelController.getDataById);
exports.ModelRoutes = router;
