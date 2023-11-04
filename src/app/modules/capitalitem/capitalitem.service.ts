/* eslint-disable @typescript-eslint/no-explicit-any */

import { CapitalItem, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { capitalItemSearchableFields } from './capitalitem.constrant';
import { capitalItemFilterRequest } from './capitalitem.interface';

const inertIntoDB = async (
  data: CapitalItem,
  authUser: { mobileNo: string; role: string; pbsCode: string }
): Promise<CapitalItem> => {
  data.pbsCode = authUser.pbsCode;
  data.addByMobileNo = authUser.mobileNo;
  const isExist = await prisma.capitalItem.findFirst({
    where: {
      brandId: data.brandId,
      serialNo: data.serialNo,
      modelId: data.modelId,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Capital item already exist');
  }
  const result = prisma.capitalItem.create({
    data: data,
    include: {
      model: true,
      brand: true,
      supplier: true,
      itemType: true,
      category: true,
      subCategory: true,
      pbs: true,
      addBy: true,
      zonals: true,
      complainCenter: true,
      substation: true,
      issueBy: true,
      assignTo: true,
      approveBy: true,
      received: true,
      certifiedBy: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: capitalItemFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<CapitalItem[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: capitalItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.CapitalItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.capitalItem.findMany({
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
      survicings:true,
      
      issueBy: {
        include:{
          employee:{
            include:{
              designation:true
            }
          }
        }
      },
      addBy:{
        include:{
          employee:{
            include:{
              designation:true
            }
          }
        }
      },
      approveBy: {
        include:{
          employee:{
            include:{
              designation:true
            }
          }
        }
      },
      assignTo: {
        include:{
          employee:{
            include:{
              designation:true
            }
          }
        }
      },
    },
    // orderBy:
    //   options.sortBy && options.sortOrder
    //     ? {
    //         [options.sortBy]: options.sortOrder,
    //       }
    //     : {
    //         zonalCode: 'desc',
    //       },
    orderBy:[{
      zonalCode:'asc'
    },
    {
      assignToMobileNo:'asc'
    }
  ]
  });

  const total = await prisma.capitalItem.count({
    where: {
      ...whereCondition,
      activeOrcondemnationStatus: 'a',
      pbsCode: pbsCode,
    },
  });
  return {
    meta: {
      total: total,
      page,
      limit,
    },
    data: result,
  };
};
const getAllNotAssignFromDB = async (
  filters: capitalItemFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<CapitalItem[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: capitalItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.CapitalItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.capitalItem.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      assignToMobileNo: null,
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
  const total = await prisma.capitalItem.count({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      assignToMobileNo: null,
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
const getAllNotApproveFromDB = async (
  filters: capitalItemFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<CapitalItem[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: capitalItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.CapitalItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.capitalItem.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      approveByMobileNo: null,
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
  const total = await prisma.capitalItem.count({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      approveByMobileNo: null,
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
const getAllNotCertifyFromDB = async (
  filters: capitalItemFilterRequest,
  options: IPaginationOptions,
  pbsCode: string
): Promise<IGenericResponse<CapitalItem[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars

  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: capitalItemSearchableFields.map(field => ({
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

  const whereCondition: Prisma.CapitalItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.capitalItem.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      certifiedByMobileNo: null,
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
  const total = await prisma.capitalItem.count({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      certifiedByMobileNo: null,
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

const getAllNotReveiveFromDB = async (
  filters: capitalItemFilterRequest,
  options: IPaginationOptions,
  pbsCode: string,
  user: any
): Promise<IGenericResponse<CapitalItem[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars
  console.log(user);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: capitalItemSearchableFields.map(field => ({
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

  // const whereCondition: Prisma.CapitalItemWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {};
  const whereCondition: Prisma.CapitalItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.capitalItem.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      receivedByMobileNo: null,
      assignToMobileNo: user.mobileNo,
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
  const total = await prisma.capitalItem.count({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      receivedByMobileNo: null,
      assignToMobileNo: user.mobileNo,
    },
  });

  return {
    meta: {
      total: total,
      page,
      limit,
    },
    data: result,
  };
};
const getDataById = async (id: string): Promise<CapitalItem | null> => {
  const result = await prisma.capitalItem.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
const getDataByIdentificationNo = async (identificationNo: string): Promise<CapitalItem | null> => {
  // console.log("identificationNo",identificationNo)
  const result = await prisma.capitalItem.findUnique({
    where: {
      identificationNo: identificationNo,
    },
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
      survicings:{
        include:{
          serviceByuser:true,
          supplier:true,
        
        }
      },
      revenueItem:{
        include:{
          model:true,
          brand:true,
          itemType:true,
          category:true,
          subCategory:true,
          supplier:true,
          zonals:true,
          addBy:{
            include:{
              employee:true
            }
          },
          issueBy:{
            include:{
              employee:true
            }
          },
          assignTo:{
            include:{
              employee:true
            }
          },
          approveBy:{
            include:{
              employee:true
            }
          },
        }
      },
      issueBy: {
        include:{
          employee:true
        }
      },
      addBy:{
        include:{
          employee:true
        }
      },
      approveBy: {
        include:{
          employee:true
        }
      },
      assignTo: {
        include:{
          employee:true
        }
      },
    },
    
  });

  const inputDate= result?.purchasedate; // Replace this with the actual date value

// Create a Date object from the input date string
if(!inputDate)
{
  throw new ApiError(httpStatus.BAD_REQUEST, "Purchase Date Not Found")
}
const date = new Date(inputDate);

// Get day, month, and year components
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-indexed, so we add 1.
const year = date.getFullYear();

// Create the formatted date string
const formattedDate = `${day}-${month}-${year}`;
  result.purchasedate=formattedDate
  
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<CapitalItem>
): Promise<CapitalItem> => {
  const result = await prisma.capitalItem.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const insertAssignToDB = async (
  authUser: any,
  bodyData: any,
  id: string
): Promise<CapitalItem> => {
  // for get item code
  const subCategoryDataFromDB = await prisma.subCategory.findFirst({
    where: {
      capitalItem: {
        some: {
          id: id,
        },
      },
    },
  });
  const currentzonal = await prisma.capitalItem.findUnique({
    where: {
      id: id,
    },
  });

  // console.log('currentzonal');
  if (currentzonal?.zonalCode === bodyData.zonalCode) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Already allocated Requested Office'
    );
  }
  if (!subCategoryDataFromDB?.itemCode || !subCategoryDataFromDB) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'item code not found');
  }
  const allData = await prisma.capitalItem.findMany({
    where: {
      subCategory: {
        itemCode: subCategoryDataFromDB?.itemCode,
      },
      pbsCode: authUser.pbsCode,
      zonalCode: bodyData.zonalCode,
    },
  });
  console.log('allData', allData);

  const allIdentificationNo: any = [];
  allData.map(element => {
    allIdentificationNo.push(element?.identificationNo);
  });
  const arrayOfIdentificationNoLastTwoDigit: number[] = [];
  allIdentificationNo.map((element: string) => {
    const num = parseInt(element.slice(-2));
    arrayOfIdentificationNoLastTwoDigit.push(num);
  });
  const maxNumber: number = Math.max(...arrayOfIdentificationNoLastTwoDigit);
  let identificationNo;
  const zonalOfficeCode = bodyData.zonalCode.toString().slice(-2);
  if (allIdentificationNo.length < 1) {
    identificationNo =
      authUser.pbsCode +
      '.' +
      zonalOfficeCode +
      '.' +
      subCategoryDataFromDB?.itemCode +
      '.' +
      '01';
  } else {
    identificationNo =
      authUser.pbsCode +
      '.' +
      zonalOfficeCode +
      '.' +
      subCategoryDataFromDB?.itemCode +
      '.' +
      (maxNumber < 9 ? '0' + (maxNumber + 1) : maxNumber + 1).toString();
  }
  ///find designation and department
   const employeeInfo=await prisma.employee.findFirst({
    where:{
      mobileNo:bodyData.assignTo
    }
   })
   if(!employeeInfo)
   {
    throw new ApiError(httpStatus.BAD_REQUEST, "Employee not found")
   }

  const result = prisma.capitalItem.update({
    where: {
      id: id,
    },
    data: {
      assignToMobileNo: bodyData.assignTo,
      issueByMobileNo: authUser.mobileNo,
      zonalCode: bodyData.zonalCode,
      identificationNo: identificationNo,
      designationId:employeeInfo.designationId,
      departmentId:employeeInfo.departmentId,
    },
  });
  return result;
};
const insertApproveToDB = async (
  AuthUserMobileNo: string,
  id: string
): Promise<CapitalItem> => {
  const result = prisma.capitalItem.update({
    where: {
      id: id,
    },
    data: {
      approveByMobileNo: AuthUserMobileNo,
    },
  });
  return result;
};
const insertCertifyToDB = async (
  AuthUserMobileNo: string,
  id: string
): Promise<CapitalItem> => {
  const result = prisma.capitalItem.update({
    where: {
      id: id,
    },
    data: {
      certifiedByMobileNo: AuthUserMobileNo,
    },
  });
  return result;
};

const insertReceiveToDB = async (
  AuthUserMobileNo: string,
  id: string
): Promise<CapitalItem> => {
  const result = prisma.capitalItem.update({
    where: {
      id: id,
    },
    data: {
      receivedByMobileNo: AuthUserMobileNo,
    },
  });
  return result;
};
const getAllFromDBByAssignTo = async (
  filters: capitalItemFilterRequest,
  options: IPaginationOptions,
  pbsCode: string,
  user: any
): Promise<IGenericResponse<CapitalItem[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // eslint-disable-next-line no-unused-vars
  console.log(user);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: capitalItemSearchableFields.map(field => ({
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

  // const whereCondition: Prisma.CapitalItemWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {};
  const whereCondition: Prisma.CapitalItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.capitalItem.findMany({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      receivedByMobileNo: user?.mobileNo,
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
  const total = await prisma.capitalItem.count({
    where: {
      ...whereCondition,
      pbsCode: pbsCode,
      receivedByMobileNo: user?.mobileNo,
    },
  });

  return {
    meta: {
      total: total,
      page,
      limit,
    },
    data: result,
  };
};
export const CapitalItemService = {
  inertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  insertAssignToDB,
  getAllNotAssignFromDB,
  insertApproveToDB,
  getAllNotApproveFromDB,
  insertCertifyToDB,
  getAllNotCertifyFromDB,
  insertReceiveToDB,
  getAllNotReveiveFromDB,
  getAllFromDBByAssignTo,
  getDataByIdentificationNo
};
