/* eslint-disable @typescript-eslint/no-explicit-any */

import { AvailableDesignation, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { availableDesignationSearchableFields } from './availableDesignation.constrant';
import { availableDesignationFilterRequest } from './availableDesignation.interface';


const inertIntoDB = async (data: AvailableDesignation,pbsCode:string): Promise<AvailableDesignation> => {
  data.pbsCode=pbsCode
  // data.zonalCode=zonalCode
  const result = prisma.availableDesignation.create({
    data: data,
    include:{
      pbs:true,
      zonal:true
    }
  });
  return result;
};
// get all supplier
const getAllFromDB = async (
  filters: availableDesignationFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<AvailableDesignation[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars
 
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: availableDesignationSearchableFields.map(field => ({
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

  const whereCondition: Prisma.AvailableDesignationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.availableDesignation.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
    },
    skip,
    take: limit,
    include:{
      pbs:true,
      zonal:true,
      designation:true,
      availableDepartment:true
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
  const total = await prisma.availableDesignation.count({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
    },
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AvailableDesignation | null> => {
  const result = await prisma.availableDesignation.findUnique({
    where: {
      id: id,
    },
    include:{
      pbs:true,
      zonal:true,
      designation:true,
      availableDepartment:true
    },
  });
  return result;
};

const deleteById = async (id: string): Promise<AvailableDesignation | null> => {
  const result = await prisma.availableDesignation.findUnique({
    where: {
      id: id,
    },
    include:{
      pbs:true,
      zonal:true
    }
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<AvailableDesignation>
): Promise<AvailableDesignation> => {
  const result = await prisma.availableDesignation.update({
    where: {
      id: id,
    },
    include:{
      pbs:true,
      zonal:true
    },
    data: payload,
  });
  return result;
};
export const AvailableDesignationService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  deleteById,
  updateIntoDB,
};
