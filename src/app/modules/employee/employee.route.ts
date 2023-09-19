import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.get(
  '/:mobileNo',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  EmployeeController.getDataById
);
router.patch(
  '/:mobileNo',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(EmployeeValidation.update),
  EmployeeController.updateIntoDB
);

export const EmployeeRoutes = router;
