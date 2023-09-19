import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ComplainController } from './complain.controller';
import { ComplainValidation } from './complain.validation';
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.post(
  '/create-complain',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(ComplainValidation.create),
  ComplainController.insertIntoDB
);
router.get(
  '/:pbsCode',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  ComplainController.getAllFromDB
);
router.patch(
  '/:complainCode',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(ComplainValidation.update),
  ComplainController.getAllFromDB
);
router.get(
  '/complain/:complainCode',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  ComplainController.getDataById
);

export const ComplainRoutes = router;
