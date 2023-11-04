/* eslint-disable @typescript-eslint/no-explicit-any */

import { Category, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { categorySearchableFields } from './category.constrant';
import { categoryFilterRequest } from './category.interface';

const inertIntoDB = async (data: Category): Promise<Category> => {
  const category = await prisma.category.findFirst({
    where: {
      categoryName: {
        equals: data.categoryName,
        mode: 'insensitive',
      },
    }
  });
  
  if (category) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category already exists");
  }
  const result = prisma.category.create({
    data: data,
    include:{
      itemType:true
    }
  });
  return result;
};

const getAllFromDB = async (
  filters: categoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
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

  const whereCondition: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.category.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      itemType: true,
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
  const total = await prisma.category.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const CategoryService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
};
