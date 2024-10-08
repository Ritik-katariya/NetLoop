import { Owner } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { Request } from "express";
import { EmailtTransporter } from "../../../helper/emailtransfer";
import config from "../../../config";
import moment from "moment";
import { isValid } from "zod";
import * as path from "path";
import { UserVerfication } from "@prisma/client";
import { promises } from "dns";
import { validateEmail } from "../../../utils/emailValidate";
const otpGenerator = require("otp-generator");
const { v4: uuidv4 } = require("uuid");


//use for sending OTPemail 
const sendOtponEmail = async (email: string, otp: string) => {
  const pathName = path.join(__dirname, "../../../../template/verify.html");
  const subject = "Sending OTP for Email Verification";
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
};



//use for resend otp email 
const reSendOtponEmail = async (payload: any) => {
  const { email } = payload;
  const pathName = path.join(__dirname, "../../../../template/verify.html");
  const subject = "Sending OTP for Email Verification";
  const isExist = await prisma.userVerfication.findUniqueOrThrow({
    where: {
      email,
    },
  });
  const expiresDate = new Date(Date.now() + 10 * 60 * 1000);
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const uVerify = await prisma.userVerfication.update({
    where: {
      email,
    },
    data: {
      expiresAt: expiresDate,
      otp,
    },
  });

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

  return uVerify;
};





//use for signup
const sendOTP = async (payload: any): Promise<any> => {
  const data: any = await prisma.$transaction(
    async (tx) => {
      const { email, password } = payload;
      const isExist = await tx.userVerfication.findUnique({
        where: {
          email,
        },
      });
      if (!email) {
        throw new Error("Enter Email !!");
      }
      if (!validateEmail(email)) {
        throw new Error("Enter a Valid Email");
      }
      if (isExist) {
       return reSendOtponEmail(email);
      }
      if (password.length < 8) {
        throw new Error("Password should be at least 8 characters long");
      }
      const hashpassword = await bcrypt.hash(password, 10);

      const expiresDate = new Date(Date.now() + 10 * 60 * 1000);
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const uVerify = await tx.userVerfication.create({
        data: {
          email,
          expiresAt: expiresDate,
          otp,
          password: hashpassword,
        },
      });
      return uVerify;
    },
    {
      timeout: 10000,
    }
  );
  sendOtponEmail(data.email, data.otp);
};





//use for verify otp and  create a auth table
const verifyOTP = async (payload: any): Promise<any> => {
  const data = await prisma.$transaction(async (tx) => {
    const { email, otp } = payload;
    const userVerfication = await tx.userVerfication.findUnique({
      where: {
        email,
      },
    });
    if (!userVerfication) {
      throw new Error("User Not Found");
    }
    if (!otp || !email) {
      throw new Error("Input right data");
    }
    if (userVerfication.otp !== otp) {
      throw new Error("OTP Doesn't Match");
    }

    const auth = await tx.auth.create({ data: { email, password:userVerfication.password } });

    return auth;
  });
};





//use for create a owner
const createOwner = async (payload: any): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const { ...othersData } = payload;
      const existEmail = await tx.auth.findUnique({
        where: { email: othersData.email },
      });
      if (!existEmail) {
        throw new Error("Email not Exist !!");
      }

      const owner = await tx.owner.create({ data: othersData });

      await tx.auth.update({
        where: { email: othersData.email },
        data: {
          userId: owner.id,
        },
      });
      return owner;
    },
    {
      timeout: 10000, // 10 seconds timeout for the entire transaction
    }
  );
  return data;
};

export const ownerService = {
  createOwner,
  sendOTP,
  reSendOtponEmail,
  verifyOTP,
};
