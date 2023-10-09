import { RevenueItem } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { RevenueItemFilterableFields } from './revenueitem.constrant';
import { RevenueItemService } from './revenueitem.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const result = await RevenueItemService.inertIntoDB(req.body, user);
  sendResponse<RevenueItem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RevenueItem Created Successfully',
    data: result,
  });
});
const assignToUserOrIdentificationNo: RequestHandler = catchAsync(
  async (req, res) => {
    const user = (req as any).user;
    const id = req.params.id;
    const result = await RevenueItemService.assignToUserOrIdentificationNo(
      req.body,
      user,
      id
    );
    sendResponse<RevenueItem>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Item Assign Successfully',
      data: result,
    });
  }
);
const createReveiveByUser: RequestHandler = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const id = req.params.id;
  const result = await RevenueItemService.createReveivedByUser(user, id);
  sendResponse<RevenueItem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item Reveived Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.pbsCode;
  const filters = pick(req.query, RevenueItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await RevenueItemService.getAllFromDB(
    filters,
    options,
    pbsCode
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RevenueItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getAllReceivePending = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const filters = pick(req.query, RevenueItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result =
    await RevenueItemService.getAllReceivePending(
      filters,
      options,
      user
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RevenueItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});
const getAllAssignPending = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const filters = pick(req.query, RevenueItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result =
    await RevenueItemService.getAllAssignPending(
      filters,
      options,
      user
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RevenueItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getAllFromDBReveivedBy = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const filters = pick(req.query, RevenueItemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await RevenueItemService.getAllFromDBReveivedBy(
    filters,
    options,
    user
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RevenueItem data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RevenueItemService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RevenueItem data fatched',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await RevenueItemService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Revenue item Updated Successfully',
    data: result,
  });
});
export const RevenueItemController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  assignToUserOrIdentificationNo,
  // getAllFromDBByAssignToAndReceivePending,
  getAllAssignPending,
  getAllReceivePending,
  createReveiveByUser,
  getAllFromDBReveivedBy,
};
