import { CapitalItem } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { capitalItemFilterableFields } from './capitalitem.constrant';
import { CapitalItemService } from './capitalitem.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await CapitalItemService.inertIntoDB(req.body);
  sendResponse<CapitalItem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CapitalItem Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.id;
  const filters = pick(req.query, capitalItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CapitalItemService.getAllFromDB(
    filters,
    options,
    pbsCode
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CapitalItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});
const getAllNotAssignFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.id;
  const filters = pick(req.query, capitalItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CapitalItemService.getAllNotAssignFromDB(
    filters,
    options,
    pbsCode
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Not Assign CapitalItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});
const getAllNotApproveFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.id;
  const filters = pick(req.query, capitalItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CapitalItemService.getAllNotApproveFromDB(
    filters,
    options,
    pbsCode
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Not Approved CapitalItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getAllNotCertifyFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.id;
  const filters = pick(req.query, capitalItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CapitalItemService.getAllNotCertifyFromDB(
    filters,
    options,
    pbsCode
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Not Certify CapitalItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getAllNotReceiveFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.id;
  const filters = pick(req.query, capitalItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CapitalItemService.getAllNotReveiveFromDB(
    filters,
    options,
    pbsCode,
    req.user
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Not Receive CapitalItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CapitalItemService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CapitalItem data fatched',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CapitalItemService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Capital item Updated Successfully',
    data: result,
  });
});
const insertAssignToDB = catchAsync(async (req, res) => {
  const result = await CapitalItemService.insertAssignToDB(
    req.user,
    req.body,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Assign Successfully',
    data: result,
  });
});
const insertApproveToDB = catchAsync(async (req, res) => {
  const authUserMobileNo = req.user?.mobileNo;
  const result = await CapitalItemService.insertApproveToDB(
    authUserMobileNo,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Approved Successfully',
    data: result,
  });
});
const insertcertifyToDB = catchAsync(async (req, res) => {
  const authUserMobileNo = req.user?.mobileNo;
  const result = await CapitalItemService.insertCertifyToDB(
    authUserMobileNo,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certify Successfully',
    data: result,
  });
});
const insertReceiveToDB = catchAsync(async (req, res) => {
  const authUserMobileNo = req.user?.mobileNo;
  const result = await CapitalItemService.insertReceiveToDB(
    authUserMobileNo,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Receive Successfully',
    data: result,
  });
});

const getAllFromDBByAssignTo = catchAsync(async (req, res) => {
  const pbsCode = req.params.id;
  const filters = pick(req.query, capitalItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CapitalItemService.getAllFromDBByAssignTo(
    filters,
    options,
    pbsCode,
    req.user
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Capital Item Fached',
    meta: result.meta,
    data: result.data,
  });
});
export const CapitalItemController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  insertAssignToDB,
  getAllNotAssignFromDB,
  insertApproveToDB,
  getAllNotApproveFromDB,
  insertcertifyToDB,
  getAllNotCertifyFromDB,
  insertReceiveToDB,
  getAllNotReceiveFromDB,
  getAllFromDBByAssignTo,
};
