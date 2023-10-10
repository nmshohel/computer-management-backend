"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const servicing_controller_1 = require("./servicing.controller");
const servicing_validation_1 = require("./servicing.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/create-servicing', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(servicing_validation_1.ServicingValidation.create), servicing_controller_1.ServicingController.insertIntoDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), servicing_controller_1.ServicingController.getAllFromDB);
router.get('/servicing/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), servicing_controller_1.ServicingController.getDataById);
router.patch('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(servicing_validation_1.ServicingValidation.update), servicing_controller_1.ServicingController.updateIntoDB);
exports.ServicingRoutes = router;
