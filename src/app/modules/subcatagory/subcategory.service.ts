/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma, SubCategory } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { subCategorySearchableFields } from './subcategory.constrant';
import { subCategoryFilterRequest } from './subcategory.interface';

const inertIntoDB = async (data: SubCategory): Promise<SubCategory> => {
  const result = prisma.subCategory.create({
    data: data,
    include:{
      category:true
    }
  });
  return result;
};

const getAllFromDB = async (
  filters: subCategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<SubCategory[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: subCategorySearchableFields.map(field => ({
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

  const whereCondition: Prisma.SubCategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.subCategory.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: { category: true },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.subCategory.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<SubCategory | null> => {
  const result = await prisma.subCategory.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const SubCategoryService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
};
