/* eslint-disable @typescript-eslint/no-explicit-any */


import { Prisma, Supplier } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { supplierSearchableFields } from './supplier.constrant';
import { supplierFilterRequest } from './supplier.interface';

const inertIntoDB = async (data: Supplier): Promise<Supplier> => {
  const supplier=await prisma.supplier.findFirst({
    where:{
      name:data?.name,
      pbsCode:data?.pbsCode
    }
  })
  if(supplier){
    throw new ApiError(httpStatus.BAD_REQUEST, "Supplier Already Exist")
  }
  const result = prisma.supplier.create({
    data: data,
    include:{
    pbs:true
    }
  });
  return result;
};
// get all supplier
const getAllFromDB = async (
  filters: supplierFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<Supplier[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: supplierSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.SupplierWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.supplier.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
    },
    skip,
    take: limit,
    include: {
      pbs: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.supplier.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Supplier | null> => {
  const result = await prisma.supplier.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const deleteById = async (id: string): Promise<Supplier | null> => {
  const result = await prisma.supplier.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<Supplier>
): Promise<Supplier> => {
  const result = await prisma.supplier.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};
export const SupplierService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  deleteById,
  updateIntoDB,
};
