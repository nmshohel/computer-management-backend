'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CapitalItemRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const capitalitem_controller_1 = require('./capitalitem.controller');
const capitalitem_validation_1 = require('./capitalitem.validation');
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post(
  '/create-capital-item',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    capitalitem_validation_1.CapitalItemValidation.create
  ),
  capitalitem_controller_1.CapitalItemController.insertIntoDB
);
router.get(
  '/:pbsCode',
  (0, auth_1.default)(
    ADMIN,
    SUPER_ADMIN,
    OFFICE_HEAD,
    STORE_HEAD,
    INCHARGE,
    USER
  ),
  capitalitem_controller_1.CapitalItemController.getAllFromDB
);
router.get(
  '/capital/:id',
  (0, auth_1.default)(
    ADMIN,
    SUPER_ADMIN,
    OFFICE_HEAD,
    STORE_HEAD,
    INCHARGE,
    USER
  ),
  capitalitem_controller_1.CapitalItemController.getDataById
);
router.patch(
  '/:id',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    capitalitem_validation_1.CapitalItemValidation.update
  ),
  capitalitem_controller_1.CapitalItemController.updateIntoDB
);
exports.CapitalItemRoutes = router;
