"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableDesignationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const availableDesignation_controller_1 = require("./availableDesignation.controller");
const availableDesignation_validation_1 = require("./availableDesignation.validation");
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } = user_1.ENUM_USER_ROLE;
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(availableDesignation_validation_1.AvailableDesignationValidation.create), availableDesignation_controller_1.AvailableDesigantionController.insertIntoDB);
router.get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), availableDesignation_controller_1.AvailableDesigantionController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER), availableDesignation_controller_1.AvailableDesigantionController.getDataById);
router.patch('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(availableDesignation_validation_1.AvailableDesignationValidation.update), availableDesignation_controller_1.AvailableDesigantionController.updateIntoDB);
exports.AvailableDesignationRoutes = router;
