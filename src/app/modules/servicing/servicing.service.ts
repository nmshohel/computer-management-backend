/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma, Servicing } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { survicingSearchableFields } from './servicing.constrant';
import { survicingFilterRequest } from './servicing.interface';
const inertIntoDB = async (data: Servicing): Promise<Servicing> => {
  const result = prisma.servicing.create({
    data: data,
  });
  return result;
};
// get all supplier
const getAllFromDB = async (
  filters: survicingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Servicing[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: survicingSearchableFields.map(field => ({
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

  const whereCondition: Prisma.ServicingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.servicing.findMany({
    where: {
      ...whereCondition,
    },
    include: { supplier: true, serviceByuser: true, capitalItems: true },
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
  const total = await prisma.servicing.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Servicing | null> => {
  const result = await prisma.servicing.findUnique({
    where: {
      id: id,
    },
    include: { supplier: true, serviceByuser: true, capitalItems: true },
  });
  return result;
};

const deleteById = async (id: string): Promise<Servicing | null> => {
  const result = await prisma.servicing.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<Servicing>
): Promise<Servicing> => {
  const result = await prisma.servicing.update({
    where: {
      id: id,
    },
    include: { supplier: true, serviceByuser: true, capitalItems: true },
    data: payload,
  });
  return result;
};
export const ServicingService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  deleteById,
  updateIntoDB,
};
