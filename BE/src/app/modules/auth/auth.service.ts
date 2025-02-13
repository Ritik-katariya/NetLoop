import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { JwtHelper } from "../../../helper/jwtToken";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import moment from "moment";
const { v4: uuidv4 } = require("uuid");
import * as path from "path";
const otpGenerator = require("otp-generator");
import { EmailtTransporter } from "../../../helper/emailtransfer";
import { logger } from "../../../shared/logger";
import type { Members } from "@prisma/client";

type ILginResponse = {
  accessToken?: string;
  user: {};
};

const sendOtponEmail = async (email: string, otp: string) => {
  const pathName = path.join(__dirname, "../../../../template/verify.html");
  const subject = "Sending Security code for Forgot Password";
  const obj = { OTP: otp };
  const toMail = email;
  try {
    await EmailtTransporter({ pathName, replacementObj: obj, toMail, subject });
  } catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Unable to send email !"
    );
  }
  logger.info("send Security key successfully");
};

const loginUser = async (user: any): Promise<ILginResponse> => {
  const { email, password } = user;
  const isUserExist = await prisma.auth.findUnique({
    where: { email },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
  }
  // check Verified doctor or not
  let getMemberInfo: Members | null = null;
  if (isUserExist.role === "MEMBER") {
    getMemberInfo = await prisma.members.findUnique({
      where: {
        email: isUserExist.email,
      },
    });
    if (getMemberInfo && getMemberInfo?.status === false) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Please Verify Your Email First !"
      );
    }
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
  }
  const {role} = isUserExist||{role:null};
  const { id, status } = getMemberInfo || { id: null, status: null };
  const accessToken = JwtHelper.createToken(
    { status, id ,role},
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken, user: { status, id } };
};

const resetpassword = async (user: any): Promise<any> => {
  const { email, password, newpassword } = user;
  const isUserExist = await prisma.auth.findUnique({
    where: { email },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
  }
  const issame = await bcrypt.compare(password, isUserExist.password);
  if (!issame) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
  }
  const hashedPassword = await bcrypt.hash(newpassword, 10);
  await prisma.auth.update({
    where: { email },
    data: { password: hashedPassword },
  });
  return { message: "Password reset successfully" };
};
const forgotpassword = async (payload: any) => {
  const { email } = payload;
  if (email.length <= 0) throw new Error("enter valid email address");

  const isUserExist = await prisma.auth.findUnique({
    where: { email },
  });
  if (!isUserExist) throw new Error("email not found");
  const otp = otpGenerator.generate(8, {
    upperCaseAlphabets: true,
    specialChars: true,
  });
  const expiresDate = new Date(Date.now() + 10 * 60 * 1000);
  const resendotp = await prisma.forgotPassword.findFirst({ where: { email } });
  if (resendotp) {
    await prisma.forgotPassword.delete({ where: { email } });
  }
  const forgotpass = await prisma.forgotPassword.create({
    data: { email, otp, expiresAt: expiresDate },
  });
  sendOtponEmail(email, otp);
  logger.info("Reset Password successfully");

  return forgotpassword;
};

const setNewPassword = async (payload: any) => {
  const { email, otp, password, confirmPassword } = payload;
  if (password.length < 8)
    throw new Error("Password should be at least 8 characters long");
  if (password !== confirmPassword)
    throw new Error("Password and confirm password does not match");
  const isUserExist = await prisma.auth.findUnique({
    where: { email },
  });
  if (!isUserExist) throw new Error("email not found");
  const isOtpValid = await prisma.forgotPassword.findFirst({
    where: { email, otp, expiresAt: { gt: new Date() } },
  });
  if (!isOtpValid) throw new Error("Invalid OTP or expired OTP");
  if (isOtpValid.expiresAt < new Date()) throw new Error("OTP is expired");
  if (otp === isOtpValid.otp) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.auth.update({
      where: { email },
      data: { password: hashedPassword },
    });
    await prisma.forgotPassword.delete({ where: { email, otp } });
  } else return { message: "Invalid OTP" };

  return { message: "Password reset successfully" };
};

export const AuthService = {
  loginUser,
  resetpassword,
  forgotpassword,
  setNewPassword,
};
