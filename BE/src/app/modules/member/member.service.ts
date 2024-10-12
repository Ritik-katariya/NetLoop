import { Members } from "@prisma/client";
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
import { Otpverify } from "@prisma/client";
import { promises } from "dns";
import { validateEmail } from "../../../utils/emailValidate";
const otpGenerator = require("otp-generator");
const { v4: uuidv4 } = require("uuid");
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { memberFilters } from "./member.interface";
import { IGenericResponse } from "../../../interfaces/common";
import { memberFilltersData } from "./member.interface";
import { memberSearchableFields } from "./member.interface";

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
  const isExist = await prisma.otpverify.findUniqueOrThrow({
    where: {
      email,
    },
  });
  const expiresDate = new Date(Date.now() + 10 * 60 * 1000);
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const uVerify = await prisma.otpverify.update({
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
};

//use for signup
const sendOTP = async (payload: any): Promise<any> => {
  const data: any = await prisma.$transaction(
    async (tx) => {
      const { email, password } = payload;
      const isExist = await tx.otpverify.findUnique({
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
      const mVerify = await tx.otpverify.create({
        data: {
          email,
          expiresAt: expiresDate,
          otp,
          password: hashpassword,
        },
      });
      return mVerify;
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
    const otpverify = await tx.otpverify.findUnique({
      where: {
        email,
      },
    });
    if (!otpverify) {
      throw new Error("User Not Found");
    }
    if (!otp || !email) {
      throw new Error("Input right data");
    }
    if (otpverify.otp !== otp) {
      throw new Error("OTP Doesn't Match");
    }

    const auth = await tx.auth.create({
      data: { email, password: otpverify.password },
    });

    return auth;
  });
};

//use for create a Member
const createMember = async (payload: any): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const { ...othersData } = payload;
      const existEmail = await tx.auth.findUnique({
        where: { email: othersData.email },
      });
      if (!existEmail) {
        throw new Error("Email not Exist !!");
      }

      const member = await tx.members.create({ data: othersData });

      await tx.auth.update({
        where: { email: othersData.email },
        data: {
          userId: member.id,
        },
      });
      return member;
    },
    {
      timeout: 10000, // 10 seconds timeout for the entire transaction
    }
  );
  return data;
};

const getAllMember = async (
  filters: memberFilters
): Promise<IGenericResponse<Members[]>> => {
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: memberSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: { equals: value },
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.members.findMany({
    where: whereCondition,
  });

  const total = await prisma.members.count({ where: whereCondition });
  return {
    meta: {
      limit: 0,
      page: 0,
      total,
    },
    data: result,
  };
};

const getoneMember = async (id: string): Promise<Members | null> => {
  const result = await prisma.members.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
const updateMember = async (req: Request): Promise<Members> => {
  const file = req.file as IUpload;
  const id = req.params.id as string;
  const user = req.body;

  if (file) {
    const uploadImage = await CloudinaryHelper.uploadFile(file);
    if (uploadImage) {
      user.img = uploadImage.secure_url;
    } else {
      throw new ApiError(
        httpStatus.EXPECTATION_FAILED,
        "Failed to Upload Image"
      );
    }
  }
  const result = await prisma.members.update({
    where: { id },
    data: user,
  });
  return result;
};
const deleteMember = async (id: string): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const patient = await tx.members.delete({
      where: {
        id: id,
      },
    });
    await tx.auth.delete({
      where: {
        email: patient.email,
      },
    });
  });
  return result;
};

export const memberService = {
  createMember,
  sendOTP,
  reSendOtponEmail,
  verifyOTP,
  getoneMember,
  updateMember,
  deleteMember,
  getAllMember,
};
