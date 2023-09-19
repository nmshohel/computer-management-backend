'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BrandRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const brand_controller_1 = require('./brand.controller');
const brand_validation_1 = require('./brand.validation');
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post(
  '/create-brand',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(brand_validation_1.BrandValidation.create),
  brand_controller_1.BrandController.insertIntoDB
);
router.get(
  '/',
  (0, auth_1.default)(
    ADMIN,
    SUPER_ADMIN,
    OFFICE_HEAD,
    STORE_HEAD,
    INCHARGE,
    USER
  ),
  brand_controller_1.BrandController.getAllFromDB
);
router.get(
  '/:id',
  (0, auth_1.default)(
    ADMIN,
    SUPER_ADMIN,
    OFFICE_HEAD,
    STORE_HEAD,
    INCHARGE,
    USER
  ),
  brand_controller_1.BrandController.getDataById
);
exports.BrandRoutes = router;
