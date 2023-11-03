import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AvailableDesigantionController } from './availableDesignation.controller';
import { AvailableDesignationValidation } from './availableDesignation.validation';

const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.post(
  '/',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(AvailableDesignationValidation.create),
  AvailableDesigantionController.insertIntoDB
);
router.get(
  '/',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  AvailableDesigantionController.getAllFromDB
);
router.get(
  '/:id',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  AvailableDesigantionController.getDataById
);
router.patch(
  '/:id',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(AvailableDesignationValidation.update),
  AvailableDesigantionController.updateIntoDB
);
export const AvailableDesignationRoutes = router;
