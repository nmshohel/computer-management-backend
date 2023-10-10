"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const subcategory_controller_1 = require("./subcategory.controller");
const subcategory_validation_1 = require("./subcategory.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/create-sub-category', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), (0, validateRequest_1.default)(subcategory_validation_1.SubCategoryValidation.create), subcategory_controller_1.SubCategoryController.insertIntoDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), subcategory_controller_1.SubCategoryController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN), subcategory_controller_1.SubCategoryController.getDataById);
exports.SubCategoryRoutes = router;
