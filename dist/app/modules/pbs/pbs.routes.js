"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PbsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const pbs_controller_1 = require("./pbs.controller");
const pbs_validation_1 = require("./pbs.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/create-pbs', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(pbs_validation_1.PbsValidation.create), pbs_controller_1.PbsController.insertIntoDB);
router.delete('/:pbsCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN), pbs_controller_1.PbsController.singleDeleteFromDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), pbs_controller_1.PbsController.getAllFromDB);
router.get('/:pbsCode', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), pbs_controller_1.PbsController.getDataById);
exports.PbsRoutes = router;
