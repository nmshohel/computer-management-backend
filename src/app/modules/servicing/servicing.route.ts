import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServicingController } from './servicing.controller';
import { ServicingValidation } from './servicing.validation';
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.post(
  '/create-servicing',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(ServicingValidation.create),
  ServicingController.insertIntoDB
);
router.get(
  '/',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  ServicingController.getAllFromDB
);
router.get(
  '/servicing/:id',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  ServicingController.getDataById
);
router.patch(
  '/:id',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(ServicingValidation.update),
  ServicingController.updateIntoDB
);
export const ServicingRoutes = router;
