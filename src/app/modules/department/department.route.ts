import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentController } from './department.controller';
import { DepartmentValidation } from './department.validation';
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.post(
  '/create-department',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(DepartmentValidation.create),
  DepartmentController.insertIntoDB
);
router.get(
  '/',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  DepartmentController.getAllFromDB
);
router.get(
  '/:id',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  DepartmentController.getDataById
);

export const DepartmentRoutes = router;
