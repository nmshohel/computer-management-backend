import { Supplier } from "@prisma/client";
import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { supplierFilterableFields } from "./supplier.constrant";
import { SupplierService } from "./supplier.service";


const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await SupplierService.inertIntoDB(req.body);
  sendResponse<Supplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const pbsCode = req.params.pbsCode;
  const filters = pick(req.query, supplierFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SupplierService.getAllFromDB(filters, options, pbsCode);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier data fatched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SupplierService.getDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier data fatched',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await SupplierService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'supplier Updated Successfully',
    data: result,
  });
});
export const SupplierController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
};
