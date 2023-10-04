/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './user.constrant';
import { userFilterRequest } from './user.interface';

const inertIntoDB = async (
  name: string,
  designation: string,
  data: User
): Promise<User> => {
  let result: User | null = null;

  await prisma.$transaction(async tx => {
    data.password = await bcrypt.hash(
      data.password,
      Number(config.bycrypt_salt_rounds)
    );

    result = await tx.user.create({
      data: data,
    });

    await tx.employee.create({
      data: {
        mobileNo: result.mobileNo,
        name: name,
        designation: designation,
      },
    });
  });

  return result!;
};

const getAllFromDB = async (
  filters: userFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<User[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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

  const whereCondition: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
    },
    skip,
    take: limit,
    include: {
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      employee: true,
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
  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (mobileNo: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      mobileNo: mobileNo,
    },
    include: {
      employee: true,
      pbs: true,
      requestBy: true,
      requestePBS: true,
      zonals: true,
      requesteZonal: true,
    },
  });
  return result;
};
const updateIntoDB = async (
  mobileNo: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      mobileNo: mobileNo,
    },
    data: payload,
  });
  return result;
};

const pbsPostingRequest = async (
  authUser: any,
  mobileNo: string
): Promise<User> => {
  const result = prisma.user.update({
    where: {
      mobileNo: mobileNo,
    },
    data: {
      pbsTransferStatus: true,
      pbsTransferRequestBy: authUser.mobileNo,
      pbsTransferRequestedPbsCode: authUser.pbsCode,
      pbsTransferRequestDate: new Date(),
    },
    include: {
      pbs: true,
      employee: true,
      requestBy: true,
      requestePBS: true,
    },
  });
  const requestedUser = await result;
  console.log('requestedUser', requestedUser);
  return result;
};

const getAllPbsTransferRequestedUser = async (
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<User[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars
  const result = await prisma.user.findMany({
    where: {
      pbsTransferStatus: true,
      pbsCode: pbsCode,
    },

    skip,
    take: limit,
    include: {
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      employee: true,
      requestBy: true,
      requestePBS: true,
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
  const total = await prisma.user.count({
    where: {
      pbsTransferStatus: true,
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

const pbsPostingRequestApprove = async (
  authUser: any,
  userMobileNo: string
): Promise<User> => {
  console.log('authUser', authUser);
  const requestedUser = await prisma.user.findUnique({
    where: {
      mobileNo: userMobileNo,
    },
  });

  if (!requestedUser?.pbsTransferRequestedPbsCode) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Employee Not Found');
  }
  const result = prisma.user.update({
    where: {
      mobileNo: userMobileNo,
    },
    include: {
      requestePBS: true,
      requestBy: true,
    },
    data: {
      pbsTransferStatus: false,
      pbsTranferApprovedBy: authUser.mobileNo,
      pbsCode: requestedUser?.pbsTransferRequestedPbsCode,
      pbsTranferApprovedDate: new Date(),
      zonalCode: null,
      substationCode: null,
      complainCode: null,
    },
  });
  return result;
};

const pbsPostingRequestCancel = async (
  authUser: any,
  userMobileNo: string
): Promise<User> => {
  console.log('authUser', authUser);
  const result = prisma.user.update({
    where: {
      mobileNo: userMobileNo,
    },
    data: {
      pbsTransferStatus: false,
      pbsTranferCancelBy: authUser.mobileNo,
      pbsTranferCancelDate: new Date(),
    },
  });
  return result;
};
const zonalPostingRequest = async (
  authUser: any,
  bodyData: any
): Promise<User> => {
  const result = prisma.user.update({
    where: {
      mobileNo: bodyData.mobileNo,
    },
    data: {
      zonalTransferStatus: true,
      requestedZonalCode: bodyData.zonalCode,
      zonalTransferRequestBy: authUser.mobileNo,
      zonalTransferRequestDate: new Date(),
    },
    include: {
      zonals: true,
      pbs: true,
      requesteZonal: true,
      zonalTransferRequestByUser: true,
    },
  });
  return result;
};

const getAllZonalTransferRequestedUser = async (
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<User[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars
  const result = await prisma.user.findMany({
    where: {
      zonalTransferStatus: true,
      pbsCode: pbsCode,
    },
    skip,
    take: limit,
    include: {
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      employee: true,
      requesteZonal: true,
      zonalTransferRequestByUser: true,
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
  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const zonalPostingRequestApprove = async (
  authUser: any,
  userMobileNo: string
): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      mobileNo: userMobileNo,
    },
  });
  console.log('existingUser', existingUser);
  const result = await prisma.user.update({
    where: {
      mobileNo: userMobileNo,
    },
    data: {
      zonalTransferStatus: false,
      zonalTranferApprovedBy: authUser.mobileNo,
      zonalTranferApprovedDate: new Date(),
      zonalCode: existingUser?.requestedZonalCode,
    },
    include: {
      pbs: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      employee: true,
      requesteZonal: true,
      zonalTransferRequestByUser: true,
    },
  });

  return result;
};

const zonalPostingRequestCancel = async (
  authUser: any,
  userMobileNo: string
): Promise<User> => {
  const result = prisma.user.update({
    where: {
      mobileNo: userMobileNo,
    },
    data: {
      zonalTransferStatus: false,
      zonalTranferCancelBy: authUser.mobileNo,
      zonalTranferCancelDate: new Date(),
      requestedZonalCode: null,
    },
  });
  return result;
};

export const UserService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  pbsPostingRequest,
  pbsPostingRequestApprove,
  pbsPostingRequestCancel,
  getAllPbsTransferRequestedUser,
  zonalPostingRequest,
  zonalPostingRequestApprove,
  zonalPostingRequestCancel,
  getAllZonalTransferRequestedUser,
};
