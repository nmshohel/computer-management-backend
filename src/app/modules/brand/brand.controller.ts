import { Brand } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { brandFilterableFields } from './brand.constrant';
import { BrandService } from './brand.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await BrandService.inertIntoDB(req.body);
  sendResponse<Brand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand Created Successfully',
    data: result,
  });
});

const updateIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const id:string=req.params.id
  const result = await BrandService.updateIntoDB(req.body,id);
  sendResponse<Partial<Brand>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand Updated Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, brandFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BrandService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BrandService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand data fatched',
    data: result,
  });
});

export const BrandController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB
};
