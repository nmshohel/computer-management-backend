import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
import { AuthService } from './auth.service';
// import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
// import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  // delete refresh token
  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully !',
  });
});
// const forgotPassword = catchAsync(async (req: Request, res: Response) => {
//   const user = (req as any).user;
//   const { ...passwordData } = req.body;

//   await AuthService.forgotPassword(user, passwordData);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Password forgot successfully !',
//   });
// });
export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
