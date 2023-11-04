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
  const allItem=await prisma.capitalItem.findMany({
    where:{
      pbsCode:pbsCode,
      identificationNo:{
        not:null
      }
    },
    select:{
      zonalCode:true,
      identificationNo:true,
      assignTo:{
        select:{
          employee:{
            select:{
              designation:{
                select:{
                  department:{
                    select:{
                      departmentName:true
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

  })

  const scannersByZonalCode: { [key: string]: { [key: string]: string }[] } = {};
  
  allItem.forEach((item) => {
    const departmentName: string = item.assignTo!.employee!.designation!.department!.departmentName!;
    const zonalCode: string = item.zonalCode!;
    
    if (item.identificationNo!.slice(6, -3) === "SCN" && departmentName && zonalCode) {
      // Check if the zonalCode exists in the laserPrintersByZonalCode object
      if (!scannersByZonalCode[zonalCode]) {
        scannersByZonalCode[zonalCode] = [];
      }
  
      const existingDepartment = scannersByZonalCode[zonalCode].find((printer) => printer[departmentName] !== undefined);
  
      if (existingDepartment) {
        existingDepartment[departmentName] = String(Number(existingDepartment[departmentName]) + 1);
      } else {
        const newDepartment = { [departmentName]: "01" };
        scannersByZonalCode[zonalCode].push(newDepartment);
      }
    }
  });


  //-------------------------------------------------------
  const laserPrintersByZonalCode: { [key: string]: { [key: string]: string }[] } = {};
  
  allItem.forEach((item) => {
    const departmentName: string = item.assignTo!.employee!.designation!.department!.departmentName!;
    const zonalCode: string = item.zonalCode!;
    
    if (item.identificationNo!.slice(6, -3) === "PRN" && departmentName && zonalCode) {
      // Check if the zonalCode exists in the laserPrintersByZonalCode object
      if (!laserPrintersByZonalCode[zonalCode]) {
        laserPrintersByZonalCode[zonalCode] = [];
      }
  
      const existingDepartment = laserPrintersByZonalCode[zonalCode].find((printer) => printer[departmentName] !== undefined);
  
      if (existingDepartment) {
        existingDepartment[departmentName] = String(Number(existingDepartment[departmentName]) + 1);
      } else {
        const newDepartment = { [departmentName]: "01" };
        laserPrintersByZonalCode[zonalCode].push(newDepartment);
      }
    }
  });

return {
  scanner:scannersByZonalCode,
  laserPrinter:laserPrintersByZonalCode
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
