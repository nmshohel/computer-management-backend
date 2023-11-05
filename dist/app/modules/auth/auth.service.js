"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// import { User } from '../user/user.model';
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { mobileNo: userMobileNo, password } = payload;
    // creating user instance of User
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            mobileNo: userMobileNo,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    // check password matched
    if (isUserExist.password && !isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const isEmployee = yield prisma_1.default.employee.findUnique({
        where: {
            mobileNo: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.mobileNo
        },
        include: {
            designation: true
        }
    });
    if (!isEmployee) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Employee information not found");
    }
    const designation = (_a = isEmployee === null || isEmployee === void 0 ? void 0 : isEmployee.designation) === null || _a === void 0 ? void 0 : _a.designationName;
    const { mobileNo, role, pbsCode, zonalCode, complainCode, substationCode } = isUserExist;
    const { name, photoUrl } = isEmployee;
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
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(userInfo, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(userInfo, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
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
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let verifyToken = null;
    try {
        verifyToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid token');
    }
    const { mobileNo } = verifyToken;
    // checking deleteUser refresh token
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            mobileNo: mobileNo,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isEmployee = yield prisma_1.default.employee.findUnique({
        where: {
            mobileNo: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.mobileNo
        },
        include: {
            designation: true
        }
    });
    if (!isEmployee) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Employee information not found");
    }
    const designation = (_b = isEmployee === null || isEmployee === void 0 ? void 0 : isEmployee.designation) === null || _b === void 0 ? void 0 : _b.designationName;
    // genereate token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        mobileNo: isUserExist.mobileNo,
        name: isEmployee.name,
        designation: designation,
        photoUrl: isEmployee.photoUrl,
        role: isUserExist.role,
        pbsCode: isUserExist.pbsCode,
        zonalCode: isUserExist.zonalCode,
        complainCode: isUserExist.complainCode,
        substationCode: isUserExist.substationCode,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (authUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // // checking is user exist
    // const isUserExist = await User.isUserExist(user?.userId);
    //alternative way
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            mobileNo: authUser.mobileNo,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    const isPasswordMached = yield bcrypt_1.default.compare(oldPassword, isUserExist.password);
    if (!isPasswordMached) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect old password');
    }
    // hash password before saving
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    yield prisma_1.default.user.update({
        where: {
            mobileNo: authUser.mobileNo,
        },
        data: {
            password: newHashedPassword,
        },
    });
});
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
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
