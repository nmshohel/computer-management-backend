/* eslint-disable @typescript-eslint/no-explicit-any */

import { ItemType, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { itemTypeSearchableFields } from './item.type.constrant';
import { itemTypeFilterRequest } from './item.type.interface';

const inertIntoDB = async (itemTypeData: ItemType): Promise<ItemType> => {
  const result = prisma.itemType.create({
    data: itemTypeData,
  });
  return result;
};

const getAllFromDB = async (
  filters: itemTypeFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ItemType[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: itemTypeSearchableFields.map(field => ({
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

  const whereCondition: Prisma.ItemTypeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.itemType.findMany({
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
  const total = await prisma.itemType.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<ItemType | null> => {
  const result = await prisma.itemType.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const ItemTypeService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
};
