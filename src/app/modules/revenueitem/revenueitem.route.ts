import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RevenueItemController } from './revenueitem.controller';
import { RevenueItemValidation } from './revenueitem.validation';
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.get(
  '/assignPending',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  RevenueItemController.getAllAssignPending
);
router.get(
  '/ReveivePending',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  RevenueItemController.getAllReceivePending
);

router.get(
  '/reveived-by',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  RevenueItemController.getAllFromDBReveivedBy
);
router.post(
  '/create-revenue-item',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(RevenueItemValidation.create),
  RevenueItemController.insertIntoDB
);
router.post(
  '/assign-revenue-item/:id',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(RevenueItemValidation.assign),
  RevenueItemController.assignToUserOrIdentificationNo
);
router.post(
  '/receive-revenue-item/:id',
  auth(ADMIN, SUPER_ADMIN),
  RevenueItemController.createReveiveByUser
);
router.get(
  '/:pbsCode',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  RevenueItemController.getAllFromDB
);

router.get(
  '/revenue/:id',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  RevenueItemController.getDataById
);
router.patch(
  '/:id',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(RevenueItemValidation.update),
  RevenueItemController.updateIntoDB
);
export const RevenueRoutes = router;
