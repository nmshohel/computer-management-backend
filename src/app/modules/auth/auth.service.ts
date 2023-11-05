/* eslint-disable no-unused-vars */
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


  const isEmployee=await prisma.employee.findUnique({
    where:{
      mobileNo:isUserExist?.mobileNo
    },
    include:{
      designation:true
    }
  })
  if(!isEmployee){
    throw new ApiError(httpStatus.BAD_REQUEST, "Employee information not found")
  }

  const designation=isEmployee?.designation?.designationName
  const { mobileNo, role, pbsCode, zonalCode, complainCode, substationCode } =
    isUserExist;
  const {name,photoUrl}=isEmployee
  const userInfo = {
    mobileNo,
    name,
    photoUrl,
    role,
    designation,
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
  const isEmployee=await prisma.employee.findUnique({
    where:{
      mobileNo:isUserExist?.mobileNo
    },
    include:{
      designation:true
    }
  })
  if(!isEmployee){
    throw new ApiError(httpStatus.BAD_REQUEST, "Employee information not found")
  }

  const designation=isEmployee?.designation?.designationName
  // genereate token
  const newAccessToken = jwtHelpers.createToken(
    {
      mobileNo: isUserExist.mobileNo,
      name:isEmployee.name,
      designation:designation,
      photoUrl:isEmployee.photoUrl,
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

  await prisma.user.update({
    where: {
      mobileNo: authUser.mobileNo,
    },
    data: {
      password: newHashedPassword,
    },
  });
};
// const forgotPassword = async (
//   authUser: { mobileNo: string; role: string; pbsCode: string },
//   payload: IChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;
//   console.log('this is forgot pass');

//   // https://ethereal.email/create
//   const nodeConfig = {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: ENV.EMAIL, // generated ethereal user
//       pass: ENV.PASSWORD, // generated ethereal password
//     },
//   };

//   const transporter = nodemailer.createTransport(nodeConfig);

//   const MailGenerator = new Mailgen({
//     theme: 'default',
//     product: {
//       name: 'Mailgen',
//       link: 'https://mailgen.js/',
//     },
//   });

//   /** POST: http://localhost:8080/api/registerMail
// * @param: {
// "username" : "example123",
// "userEmail" : "admin123",
// "text" : "",
// "subject" : "",
// }
// */
//   const registerMail = async (req, res) => {
//     const { username, userEmail, text, subject } = req.body;

//     // body of the email
//     const email = {
//       body: {
//         name: username,
//         intro:
//           text ||
//           "Welcome to Daily Tuition! We're very excited to have you on board.",
//         outro:
//           "Need help, or have questions? Just reply to this email, we'd love to help.",
//       },
//     };

//     const emailBody = MailGenerator.generate(email);

//     const message = {
//       from: "nmshohel1992@gmail.com",
//       to: "npbs2agmit",
//       subject: subject || 'Signup Successful',
//       html: emailBody,
//     };

//     // send mail
//     transporter
//       .sendMail(message)
//       .then(() => {
//         return res
//           .status(200)
//           .send({ msg: 'You should receive an email from us.' });
//       })
//       .catch(error => res.status(500).send({ error }));
//   };
// };
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
