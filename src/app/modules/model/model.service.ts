/* eslint-disable @typescript-eslint/no-explicit-any */

import { Model, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { modelSearchableFields } from './model.constrant';
import { modelFilterRequest } from './model.interface';

const inertIntoDB = async (data: Model): Promise<Model> => {
  const result = prisma.model.create({
    data: data,
    include:{
      brand:true
    }
  });
  return result;
};
const updateIntoDB = async (data: Model,id:string): Promise<Partial<Model>> => {
  const result = prisma.model.update({
    where:{id:id},
    data: data,
  });
  return result;
};

const getAllFromDB = async (
  filters: modelFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Model[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: modelSearchableFields.map(field => ({
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

  const whereCondition: Prisma.ModelWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.model.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      brand: true,
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
  const total = await prisma.model.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Model | null> => {
  const result = await prisma.model.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const ModelService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB
};
