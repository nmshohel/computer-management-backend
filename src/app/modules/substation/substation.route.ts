import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SubstationController } from './substation.controller';
import { SubstationValidation } from './substation.validation';
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.post(
  '/create-substation',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(SubstationValidation.create),
  SubstationController.insertIntoDB
);
router.get(
  '/:pbsCode',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  SubstationController.getAllFromDB
);
router.get(
  '/substation/:substationCode',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  SubstationController.getDataById
);
router.patch(
  '/:substationCode',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(SubstationValidation.update),
  SubstationController.updateIntoDB
);
export const SubstationRoutes = router;
