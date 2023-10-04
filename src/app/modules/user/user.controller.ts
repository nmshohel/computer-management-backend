import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constrant';
import { UserService } from './user.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const { name, designation, ...others } = req.body;
  const result = await UserService.inertIntoDB(name, designation, others);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.pbsCode;
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await UserService.getAllFromDB(filters, options, pbsCode);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const mobileNo = req.params.mobileNo;
  const result = await UserService.getDataById(mobileNo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data fatched',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req, res) => {
  const { mobileNo } = req.params;
  const payload = req.body;
  const result = await UserService.updateIntoDB(mobileNo, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully',
    data: result,
  });
});

const pbsPostingRequest: RequestHandler = catchAsync(async (req, res) => {
  const userMobileNo: string = req.params.mobileNo;
  const result = await UserService.pbsPostingRequest(req.user, userMobileNo);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PBS Transfer Request Successfully',
    data: result,
  });
});
const getAllPbsTransferRequestedUser = catchAsync(async (req, res) => {
  const pbsCode = req.params.pbsCode;

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await UserService.getAllPbsTransferRequestedUser(
    options,
    pbsCode
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Transfer Requested data fatched',
    meta: result.meta,
    data: result.data,
  });
});
const pbsPostingRequestApprove: RequestHandler = catchAsync(
  async (req, res) => {
    const userMobileNo = req.params.mobileNo;
    const result = await UserService.pbsPostingRequestApprove(
      req.user,
      userMobileNo
    );
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'PBS Transfer Request Approve Successfully',
      data: result,
    });
  }
);
const pbsPostingRequestCancel: RequestHandler = catchAsync(async (req, res) => {
  const userMobileNo = req.params.mobileNo;
  const result = await UserService.pbsPostingRequestCancel(
    req.user,
    userMobileNo
  );
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PBS Transfer Request Cancel Successfully',
    data: result,
  });
});

const zonalPostingRequest: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.zonalPostingRequest(req.user, req.body);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Zonal Transfer Request Successfully',
    data: result,
  });
});
const getAllZonalTransferRequestedUser = catchAsync(async (req, res) => {
  const pbsCode = req.params.pbsCode;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await UserService.getAllZonalTransferRequestedUser(
    options,
    pbsCode
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Transfer Requested data fatched',
    meta: result.meta,
    data: result.data,
  });
});
const zonalPostingRequestApprove: RequestHandler = catchAsync(
  async (req, res) => {
    const userMobileNo = req.params.mobileNo;
    const result = await UserService.zonalPostingRequestApprove(
      req.user,
      userMobileNo
    );
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Zonal Transfer Request Approve Successfully',
      data: result,
    });
  }
);
const zonalPostingRequestCancel: RequestHandler = catchAsync(
  async (req, res) => {
    const userMobileNo = req.params.mobileNo;
    const result = await UserService.zonalPostingRequestCancel(
      req.user,
      userMobileNo
    );
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Zonal Transfer Request Cancel Successfully',
      data: result,
    });
  }
);
export const UserController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  pbsPostingRequest,
  pbsPostingRequestApprove,
  pbsPostingRequestCancel,
  getAllPbsTransferRequestedUser,
  zonalPostingRequest,
  getAllZonalTransferRequestedUser,
  zonalPostingRequestApprove,
  zonalPostingRequestCancel,
};
