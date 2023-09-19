'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SupplierRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const supplier_controller_1 = require('./supplier.controller');
const supplier_validation_1 = require('./supplier.validation');
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post(
  '/create-supplier',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    supplier_validation_1.SupplierValidation.create
  ),
  supplier_controller_1.SupplierController.insertIntoDB
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
  supplier_controller_1.SupplierController.getAllFromDB
);
router.get(
  '/supplier/:id',
  (0, auth_1.default)(
    ADMIN,
    SUPER_ADMIN,
    OFFICE_HEAD,
    STORE_HEAD,
    INCHARGE,
    USER
  ),
  supplier_controller_1.SupplierController.getDataById
);
router.patch(
  '/:id',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    supplier_validation_1.SupplierValidation.update
  ),
  supplier_controller_1.SupplierController.updateIntoDB
);
exports.SupplierRoutes = router;
