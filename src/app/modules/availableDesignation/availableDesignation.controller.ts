/* eslint-disable @typescript-eslint/no-explicit-any */

import { AvailableDesignation } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { availableDesignationFilterableFields } from './availableDesignation.constrant';
import { AvailableDesignationService } from './availableDesignation.service';


const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const pbsCode=req.user?.pbsCode
  // const zonalCode=req.user?.zonalCode
  const result = await AvailableDesignationService.inertIntoDB(req.body,pbsCode);
  sendResponse<AvailableDesignation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Desigantion Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const pbsCode=(req as any).user?.pbsCode
  const filters = pick(req.query, availableDesignationFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AvailableDesignationService.getAllFromDB(filters, options, pbsCode);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Desigantion data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AvailableDesignationService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Desigantion data fatched',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AvailableDesignationService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Desigantion Updated Successfully',
    data: result,
  });
});
export const AvailableDesigantionController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
};
