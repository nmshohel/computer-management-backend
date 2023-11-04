/* eslint-disable @typescript-eslint/no-explicit-any */


import { AvailableDepartment, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AvailableDepartmentSearchableFields } from './availableDepartment.constrant';
import { AvailableDepartmentFilterRequest } from './availableDepartment.interface';




const inertIntoDB = async (data: AvailableDepartment,pbsCode:string): Promise<AvailableDepartment> => {
  data.pbsCode=pbsCode
  const availableDepartment=await prisma.availableDepartment.findFirst({
    where:{
      zonalCode:data?.zonalCode,
      departmentId:data?.departmentId
    },
    include:{
      zonal:true,
      department:true
    }
  })
  const zonalName=await availableDepartment?.zonal?.zonalName
  const departmentName=await availableDepartment?.department?.departmentName
  if(availableDepartment)
  {
    throw new ApiError(httpStatus.BAD_REQUEST, `${departmentName} department already exist for ${zonalName}`)
  }
  const result = prisma.availableDepartment.create({
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
  filters: AvailableDepartmentFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<AvailableDepartment[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars
 
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: AvailableDepartmentSearchableFields.map(field => ({
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

  const whereCondition: Prisma.AvailableDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.availableDepartment.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
    },
    skip,
    take: limit,
    include: {
      pbs: true,
      zonal:true,
      department:true
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
  const total = await prisma.availableDepartment.count({
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

const getDataById = async (id: string): Promise<AvailableDepartment | null> => {
  const result = await prisma.availableDepartment.findUnique({
    where: {
      id: id,
    },
    include:{
      pbs:true,
      zonal:true,
      department:true
    }
  });
  return result;
};

const availableAccessories = async (pbsCode:string) => {

  const result = await prisma.$queryRaw`
  SELECT
    AD.*, D.*, Z.*,
    (
      SELECT COUNT(CI."departmentId")
      FROM capital_item CI
      WHERE
        AD."departmentId" = CI."departmentId"
        AND CI."subCategoryid" = 'bd8df944-4bea-449b-9811-bc7fc38c64c7'
    )::text as available_scanner,
    (
      SELECT COUNT(CI."departmentId")
      FROM capital_item CI
      WHERE
        AD."departmentId" = CI."departmentId"
        AND CI."subCategoryid" = '23a8c38f-08d3-4a39-9c4a-3c09b83bc208'
    )::text as available_laser,
    (
      SELECT COUNT(CI."departmentId")
      FROM capital_item CI
      WHERE
        AD."departmentId" = CI."departmentId"
        AND CI."subCategoryid" = '43b1f688-a465-400b-8058-4c2170fd1072'
    )::text as available_photoCopy
  FROM "AvailableDepartment" AD
  INNER JOIN "departments" D ON AD."departmentId" = D."id"
  INNER JOIN "zonals" Z ON AD."zonalCode" = Z."zonalCode"
  WHERE AD."pbsCode" = ${pbsCode}
  ORDER BY AD."zonalCode", D."departmentName"`;


return {
  result
};

  
};

const deleteById = async (id: string): Promise<AvailableDepartment | null> => {
  const result = await prisma.availableDepartment.findUnique({
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
  payload: Partial<AvailableDepartment>
): Promise<AvailableDepartment> => {
  const result = await prisma.availableDepartment.update({
    where: {
      id: id,
    },
    include:{pbs:true,zonal:true},
    data: payload,
  });
  return result;
};
export const AvailableDepartmentService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  deleteById,
  updateIntoDB,
  availableAccessories
};
