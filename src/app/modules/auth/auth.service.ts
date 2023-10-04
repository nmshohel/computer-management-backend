import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
// import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  IChangePassword,
  ILoginUser,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { mobileNo: userMobileNo, password } = payload;

  // creating user instance of User

  const isUserExist = await prisma.user.findUnique({
    where: {
      mobileNo: userMobileNo,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password
  );

  // check password matched

  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token and refress token
  // const accessToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //   },
  //   config.jwt.secret as Secret,
  //   {
  //     expiresIn: config.jwt.expires_in,
  //   }
  // );
  const { mobileNo, role, pbsCode, zonalCode, complainCode, substationCode } =
    isUserExist;
  const userInfo = {
    mobileNo,
    role,
    zonalCode,
    complainCode,
    substationCode,
    pbsCode,
  };
  const accessToken = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    userInfo,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  // const refreshToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //   },
  //   config.jwt.refresh_secret as Secret,
  //   {
  //     expiresIn: config.jwt.refresh_expires_in,
  //   }
  // );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }
  const { mobileNo } = verifyToken;
  // checking deleteUser refresh token
  const isUserExist = await prisma.user.findUnique({
    where: {
      mobileNo: mobileNo,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // genereate token
  const newAccessToken = jwtHelpers.createToken(
    {
      mobileNo: isUserExist.mobileNo,
      role: isUserExist.role,
      pbsCode: isUserExist.pbsCode,
      zonalCode: isUserExist.zonalCode,
      complainCode: isUserExist.complainCode,
      substationCode: isUserExist.substationCode,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};
const changePassword = async (
  authUser: { mobileNo: string; role: string; pbsCode: string },
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await prisma.user.findFirst({
    where: {
      mobileNo: authUser.mobileNo,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password

  const isPasswordMached = await bcrypt.compare(
    oldPassword,
    isUserExist.password
  );
  if (!isPasswordMached) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect old password');
  }
  // hash password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  const updatePassword = await prisma.user.update({
    where: {
      mobileNo: authUser.mobileNo,
    },
    data: {
      password: newHashedPassword,
    },
  });

  console.log('updatePassword', updatePassword);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
