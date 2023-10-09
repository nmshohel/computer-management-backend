/* eslint-disable @typescript-eslint/no-explicit-any */

import { Brand, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { brandSearchableFields } from './brand.constrant';
import { brandFilterRequest } from './brand.interface';

const inertIntoDB = async (data: Brand): Promise<Brand> => {
  const result = prisma.brand.create({
    data: data,
    include:{
      model:true
    }
  });
  return result;
};

const getAllFromDB = async (
  filters: brandFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Brand[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: brandSearchableFields.map(field => ({
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

  const whereCondition: Prisma.BrandWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.brand.findMany({
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
  const total = await prisma.brand.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Brand | null> => {
  const result = await prisma.brand.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const BrandService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
};
