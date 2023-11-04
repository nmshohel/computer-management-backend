/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma, RevenueItem } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RevenueItemSearchableFields } from './revenueitem.constrant';
import { RevenueItemFilterRequest } from './revenueitem.interface';

const inertIntoDB = async (
  data: RevenueItem,
  authUser: { mobileNo: string; role: string; pbsCode: string }
): Promise<RevenueItem> => {
  data.pbsCode = authUser.pbsCode;
  data.addByMobileNo = authUser.mobileNo;
  const revenueItem = await prisma.revenueItem.findFirst({
    where:{
    ...data
    }
  });
  
  if (revenueItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, "revenue item already exists");
  }
  const result = prisma.revenueItem.create({
    data: data,
  });
  return result;
};
const assignToUserOrIdentificationNo = async (
  data: { identificationNo: string; assignToMobileNo: string, zonalCode: string },
  authUser: { mobileNo: string; role: string; pbsCode: string },
  id: string
): Promise<RevenueItem> => {
  const capitalItem = await prisma.capitalItem.findUnique({
    where: {
      identificationNo: data.identificationNo,
    },
    include: {
      issueBy: true,
      addBy: true,
      assignTo: true,
    },
  });

  if (!capitalItem?.identificationNo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Identification No not found');
  }
  const result = prisma.revenueItem.update({
    where: {
      id: id,
    },
    data: {
      issueByMobileNo: authUser?.mobileNo,
      zonalCode: data.zonalCode,
      assignToMobileNo: data.assignToMobileNo,
      identificationNo: data.identificationNo,
    },
  });
  return result;
};
const createReveivedByUser = async (
  authUser: { mobileNo: string; role: string; pbsCode: string },
  id: string
): Promise<RevenueItem> => {
  const result = prisma.revenueItem.update({
    where: {
      id: id,
    },
    data: {
      receivedByMobileNo: authUser?.mobileNo,
    },
  });
  return result;
};
const getAllFromDB = async (
  filters: RevenueItemFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<RevenueItem[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: RevenueItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.RevenueItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.revenueItem.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      activeOrcondemnationStatus: 'a',
    },
    skip,
    take: limit,
    include: {
      model: true,
      brand: true,
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      itemType: true,
      category: true,
      subCategory: true,
      supplier: true,
      issueBy: true,
      addBy: true,
      approveBy: true,
      assignTo: true,
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
  const total = await prisma.revenueItem.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getAllAssignPending = async (
  filters: RevenueItemFilterRequest,
  options: IPaginationOptions,
  authUser: { mobileNo: string; role: string; pbsCode: string }
): Promise<IGenericResponse<RevenueItem[]>> => {
  console.log('from assign to adn');
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: RevenueItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.RevenueItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.revenueItem.findMany({
    where: {
      ...whereCondition,
      assignToMobileNo: null,
      // receivedByMobileNo: null,
      activeOrcondemnationStatus: 'a',
    },
    skip,
    take: limit,
    include: {
      model: true,
      brand: true,
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      itemType: true,
      category: true,
      subCategory: true,
      supplier: true,
      issueBy: true,
      addBy: true,
      approveBy: true,
      assignTo: true,
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
  console.log('result', 'result');
  const total = await prisma.revenueItem.count({
    where: {
      assignToMobileNo: authUser?.mobileNo,
      receivedByMobileNo: null,
      activeOrcondemnationStatus: 'a',
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
const getAllReceivePending = async (
  filters: RevenueItemFilterRequest,
  options: IPaginationOptions,
  authUser: { mobileNo: string; role: string; pbsCode: string }
): Promise<IGenericResponse<RevenueItem[]>> => {
  console.log('from assign to adn');
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: RevenueItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.RevenueItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.revenueItem.findMany({
    where: {
      ...whereCondition,
      assignToMobileNo: authUser?.mobileNo,
      receivedByMobileNo: null,
      activeOrcondemnationStatus: 'a',
    },
    skip,
    take: limit,
    include: {
      model: true,
      brand: true,
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      itemType: true,
      category: true,
      subCategory: true,
      supplier: true,
      issueBy: true,
      addBy: true,
      approveBy: true,
      assignTo: true,
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
  console.log('result', 'result');
  const total = await prisma.revenueItem.count({
    where: {
      assignToMobileNo: authUser?.mobileNo,
      receivedByMobileNo: null,
      activeOrcondemnationStatus: 'a',
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
const getAllFromDBReveivedBy = async (
  filters: RevenueItemFilterRequest,
  options: IPaginationOptions,
  authUser: { mobileNo: string; role: string; pbsCode: string }
): Promise<IGenericResponse<RevenueItem[]>> => {
  console.log('from assign to adn');
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: RevenueItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.RevenueItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.revenueItem.findMany({
    where: {
      ...whereCondition,
      receivedByMobileNo: authUser?.mobileNo,
      activeOrcondemnationStatus: 'a',
    },
    skip,
    take: limit,
    include: {
      model: true,
      brand: true,
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      itemType: true,
      category: true,
      subCategory: true,
      supplier: true,
      issueBy: true,
      addBy: true,
      approveBy: true,
      assignTo: true,
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
  console.log('result', 'result');
  const total = await prisma.revenueItem.count({
    where: {
      receivedByMobileNo: authUser?.mobileNo,
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
const getDataById = async (id: string): Promise<RevenueItem | null> => {
  const result = await prisma.revenueItem.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<RevenueItem>
): Promise<RevenueItem> => {
  const result = await prisma.revenueItem.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};
export const RevenueItemService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  assignToUserOrIdentificationNo,
  // getAllFromDBByAssignToAndReceivePending,
  getAllReceivePending,
  getAllAssignPending,
  createReveivedByUser,
  getAllFromDBReveivedBy,
};
