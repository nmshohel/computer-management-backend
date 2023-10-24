import { Servicing } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { survicingFilterableFields } from './servicing.constrant';
import { ServicingService } from './servicing.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServicingService.inertIntoDB(req.body);
  sendResponse<Servicing>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Servicing Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, survicingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const authUserPbsCode:string=(req as any).user?.pbsCode

  const result = await ServicingService.getAllFromDB(filters, options,authUserPbsCode);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Servicing data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ServicingService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Servicing data fatched',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ServicingService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Servicing Updated Successfully',
    data: result,
  });
});
export const ServicingController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
};
