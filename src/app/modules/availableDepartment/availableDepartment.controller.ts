
import { AvailableDepartment } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AvailableDepartmentFilterableFields } from './availableDepartment.constrant';
import { AvailableDepartmentService } from './availableDepartment.service';



const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  // pbsCode=(req as any)?.user?.pbsCode
  const pbsCode=req.user?.pbsCode
  // const zonalCode=req.user?.zonalCode
  const result = await AvailableDepartmentService.inertIntoDB(req.body,pbsCode);
  sendResponse<AvailableDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Department Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.pbsCode;
  const filters = pick(req.query, AvailableDepartmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AvailableDepartmentService.getAllFromDB(filters, options, pbsCode);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Department data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AvailableDepartmentService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Department data fatched',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AvailableDepartmentService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Department Updated Successfully',
    data: result,
  });
});
export const AvailableDepartmentController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
};
