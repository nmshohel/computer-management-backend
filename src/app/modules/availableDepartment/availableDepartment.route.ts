import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AvailableDepartmentController } from './availableDepartment.controller';
import { AvailableDepartmentValidation } from './availableDepartment.validation';

const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.post(
  '/',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(AvailableDepartmentValidation.create),
  AvailableDepartmentController.insertIntoDB
);
router.get(
  '/',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  AvailableDepartmentController.getAllFromDB
);
router.get(
  '/available-accessories',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  AvailableDepartmentController.availableAccessories
);
router.get(
  '/:id',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  AvailableDepartmentController.getDataById
);
router.patch(
  '/:id',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(AvailableDepartmentValidation.update),
  AvailableDepartmentController.updateIntoDB
);
export const AvailableDepartmentRoutes = router;
