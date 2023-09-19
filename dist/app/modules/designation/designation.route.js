'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DesignationRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const designation_controller_1 = require('./designation.controller');
const designation_validation_1 = require('./designation.validation');
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post(
  '/create-designation',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    designation_validation_1.DesignationValidation.create
  ),
  designation_controller_1.DesignationController.insertIntoDB
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
  designation_controller_1.DesignationController.getAllFromDB
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
  designation_controller_1.DesignationController.getDataById
);
exports.DesignationRoutes = router;
