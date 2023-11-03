import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CapitalItemController } from './capitalitem.controller';
import { CapitalItemValidation } from './capitalitem.validation';
const { ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER } =
  ENUM_USER_ROLE;
const router = express.Router();
router.post(
  '/create-capital-item',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(CapitalItemValidation.create),
  CapitalItemController.insertIntoDB
);

router.get(
  '/:pbsCode',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  CapitalItemController.getAllFromDB
);
router.get(
  '/capital/:id',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  CapitalItemController.getDataById
);
router.get(
  '/identification-no/:identificationNo',
  auth(ADMIN, SUPER_ADMIN, OFFICE_HEAD, STORE_HEAD, INCHARGE, USER),
  CapitalItemController.getDataByIdentificationNo
);
router.patch(
  '/:id',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(CapitalItemValidation.update),
  CapitalItemController.updateIntoDB
);

router.post(
  '/assign-capital-item/:id',
  auth(ADMIN, SUPER_ADMIN),
  validateRequest(CapitalItemValidation.createAssign),
  CapitalItemController.insertAssignToDB
);
router.get(
  '/not-assign/:pbsCode',
  auth(ADMIN, SUPER_ADMIN),
  CapitalItemController.getAllNotAssignFromDB
);
router.post(
  '/approve-capital-item/:id',
  auth(ADMIN, SUPER_ADMIN,OFFICE_HEAD),
  CapitalItemController.insertApproveToDB
);
router.get(
  '/not-approve/:pbsCode',
  auth(ADMIN, SUPER_ADMIN,OFFICE_HEAD),
  CapitalItemController.getAllNotApproveFromDB
);
router.post(
  '/certify-capital-item/:id',
  auth(ADMIN, SUPER_ADMIN,STORE_HEAD),
  CapitalItemController.insertcertifyToDB
);
router.get(
  '/not-certify/:pbsCode',
  auth(ADMIN, SUPER_ADMIN,STORE_HEAD),
  CapitalItemController.getAllNotCertifyFromDB
);
router.post(
  '/receive-capital-item/:id',
  auth(ADMIN, SUPER_ADMIN),
  CapitalItemController.insertReceiveToDB
);
router.get(
  '/not-receive/:pbsCode',
  auth(ADMIN, SUPER_ADMIN),
  CapitalItemController.getAllNotReceiveFromDB
);

// 01/10/2023------------------------------------------------------------

router.get(
  '/assignTo/:pbsCode',
  auth(ADMIN, SUPER_ADMIN),
  CapitalItemController.getAllFromDBByAssignTo
);

export const CapitalItemRoutes = router;
