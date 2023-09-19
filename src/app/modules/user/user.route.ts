import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
router.post(
  '/create-user',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(UserValidation.create),
  UserController.insertIntoDB
);

router.get(
  '/:pbsCode',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  UserController.getAllFromDB
);
router.get(
  '/user/:mobileNo',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  UserController.getDataById
);
router.patch(
  '/:mobileNo',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateIntoDB
);
// ------------------------------

router.post(
  '/pbs-posting-request',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(UserValidation.UserTransferRequstOrApproveOrCancle),
  UserController.pbsPostingRequest
);
router.get(
  '/pbs-all-transfer-requested-user/:pbsCode',
  auth(ADMIN, SUPER_ADMIN),
  UserController.getAllPbsTransferRequestedUser
);
router.post(
  '/pbs-posting-request-approve/:mobileNo',
  auth(ADMIN, SUPER_ADMIN),
  UserController.pbsPostingRequestApprove
);
router.post(
  '/pbs-posting-request-cancel/:mobileNo',
  auth(ADMIN, SUPER_ADMIN),
  UserController.pbsPostingRequestCancel
);
// -------------zonal
router.post(
  '/zonal-posting-request',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(UserValidation.UserZonalTransferRequest),
  UserController.zonalPostingRequest
);
router.get(
  '/zonal-all-transfer-requested-user/:pbsCode',
  auth(ADMIN, SUPER_ADMIN),
  UserController.getAllZonalTransferRequestedUser
);
router.post(
  '/zonal-posting-request-approve/:mobileNo',
  auth(ADMIN, SUPER_ADMIN),
  UserController.zonalPostingRequestApprove
);
router.post(
  '/zonal-posting-request-cancel/:mobileNo',
  auth(ADMIN, SUPER_ADMIN),
  UserController.zonalPostingRequestCancel
);
export const UserRoutes = router;
