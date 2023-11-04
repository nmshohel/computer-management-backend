/* eslint-disable @typescript-eslint/no-explicit-any */

import { Designation, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { designationSearchableFields } from './designation.constrant';
import { designationFilterRequest } from './designation.interface';

const inertIntoDB = async (data: Designation): Promise<Designation> => {
  const designation = await prisma.designation.findFirst({
    where: {
      designationName: {
        equals: data.designationName,
        mode: 'insensitive',
      },
    }
  });
  
  if (designation) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Designation already exists");
  }
  const result = prisma.designation.create({
    data: data,
    include:{
      department:true
    }
  });
  return result;
};

const getAllFromDB = async (
  filters: designationFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Designation[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: designationSearchableFields.map(field => ({
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

  const whereCondition: Prisma.DesignationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.designation.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: { department: true },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.designation.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Designation | null> => {
  const result = await prisma.designation.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const DesignationService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
};
