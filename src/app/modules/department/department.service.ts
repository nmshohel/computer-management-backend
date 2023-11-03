/* eslint-disable @typescript-eslint/no-explicit-any */

import { Department, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { departmentSearchableFields } from './department.constrant';
import { departmentFilterRequest } from './department.interface';

const inertIntoDB = async (data: Department): Promise<Department> => {
  console.log("----------", data)
  const result = prisma.department.create({
    data: data,
  });
  return result;
};

const getAllFromDB = async (
  filters: departmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Department[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: departmentSearchableFields.map(field => ({
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

  const whereCondition: Prisma.DepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.department.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.department.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Department | null> => {
  const result = await prisma.department.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const DepartmentService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
};
