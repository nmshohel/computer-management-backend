import { Model } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { modelFilterableFields } from './model.constrant';
import { ModelService } from './model.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await ModelService.inertIntoDB(req.body);
  sendResponse<Model>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Model Created Successfully',
    data: result,
  });
});
const updateIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const id:string=req.params.id
  const result = await ModelService.updateIntoDB(req.body,id);
  sendResponse<Partial<Model>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Model Updated Successfully',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, modelFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ModelService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Model data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ModelService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Model data fatched',
    data: result,
  });
});

export const ModelController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB
};
