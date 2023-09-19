'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SubstationRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const substation_controller_1 = require('./substation.controller');
const substation_validation_1 = require('./substation.validation');
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post(
  '/create-substation',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    substation_validation_1.SubstationValidation.create
  ),
  substation_controller_1.SubstationController.insertIntoDB
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
  substation_controller_1.SubstationController.getAllFromDB
);
router.get(
  '/substation/:substationCode',
  (0, auth_1.default)(
    ADMIN,
    SUPER_ADMIN,
    OFFICE_HEAD,
    STORE_HEAD,
    INCHARGE,
    USER
  ),
  substation_controller_1.SubstationController.getDataById
);
router.patch(
  '/:substationCode',
  (0, auth_1.default)(ADMIN, SUPER_ADMIN),
  (0, validateRequest_1.default)(
    substation_validation_1.SubstationValidation.update
  ),
  substation_controller_1.SubstationController.updateIntoDB
);
exports.SubstationRoutes = router;
