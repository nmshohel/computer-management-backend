'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RevenueRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const revenueitem_controller_1 = require('./revenueitem.controller');
const revenueitem_validation_1 = require('./revenueitem.validation');
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post(
  '/create-revenue-item',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    revenueitem_validation_1.RevenueItemValidation.create
  ),
  revenueitem_controller_1.RevenueItemController.insertIntoDB
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
  revenueitem_controller_1.RevenueItemController.getAllFromDB
);
router.get(
  '/revenue/:id',
  (0, auth_1.default)(
    ADMIN,
    SUPER_ADMIN,
    OFFICE_HEAD,
    STORE_HEAD,
    INCHARGE,
    USER
  ),
  revenueitem_controller_1.RevenueItemController.getDataById
);
router.patch(
  '/:id',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    revenueitem_validation_1.RevenueItemValidation.update
  ),
  revenueitem_controller_1.RevenueItemController.updateIntoDB
);
exports.RevenueRoutes = router;
