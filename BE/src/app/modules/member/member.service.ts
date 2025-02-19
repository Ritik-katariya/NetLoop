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
import { JwtHelper } from "../../../helper/jwtToken";
import { Secret } from "jsonwebtoken";

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
const sendOTP = async (payload: any): Promise<any> => {
  const { email, password } = payload;

  if (!email) {
    throw new Error("Enter Email !!");
  }

  if (!validateEmail(email)) {
    throw new Error("Enter a Valid Email");
  }

  const pathName = path.join(__dirname, "../../../../template/verify.html");
  const subject = "Sending OTP for Email Verification";

  const data: any = await prisma.$transaction(
    async (tx) => {
      const isExist = await tx.otpverify.findUnique({
        where: {
          email,
        },
      });

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const expiresDate = new Date(Date.now() + 10 * 60 * 1000);

      if (isExist) {
        // Update OTP and expiration if the user already exists
        await tx.otpverify.update({
          where: {
            email,
          },
          data: {
            expiresAt: expiresDate,
            otp,
          },
        });
      } else {
        // Validate password for new registrations
        if (!password || password.length < 8) {
          throw new Error("Password should be at least 8 characters long");
        }
        const hashpassword = await bcrypt.hash(password, 10);

        // Create a new verification record
        await tx.otpverify.create({
          data: {
            email,
            expiresAt: expiresDate,
            otp,
            password: hashpassword,
          },
        });
      }

      return { email, otp };
    },
    {
      timeout: 10000,
    }
  );

  // const obj = { OTP: data.otp };
  // const toMail = data.email;

  try {
    // await EmailtTransporter({ pathName, replacementObj: obj, toMail, subject });
    sendOtponEmail(data.email, data.otp);
  } catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Unable to send email !"
    );
  }



  return { message: "OTP sent successfully", email: data.email };
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
      const profile= await tx.profile.create({data:{memberId:member.id}});
      const details= await tx.details.create({data:{profileId:profile.id}});
      const chat= await tx.chat.create({data:{memberId:member.id}});
      await tx.work.create({data:{detailsid:details.id}})
      await tx.education.create({data:{detailsid:details.id}})
      await tx.auth.update({
        where: { email: othersData.email },
        data: {
          userId: member.id,
        },
      });
const { role } = existEmail;
const { id, status } = member || { id: null, status: null };
  const accessToken = JwtHelper.createToken(
    { status, id ,role},
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken, user: { status, id } };
     
    },
    {
      timeout: 10000, // 10 seconds timeout for the entire transaction
    }
  );
  return data;
};

const getAllMember = async (
  filters: memberFilters
): Promise<IGenericResponse<any>> => {
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
    select: {
      id: true,
      name: true,
      status: true,
      created_at: true,
      verified: { 
        select: { id: true, verified: true } 
      },
      profile: {
        select: {
          id: true,
          img: true,
          coverImg: true,
          bio: true,
          address: true,
          city: true,
          state: true,
          pincode: true,
        },
      },
      networks: {
        select: {
          id: true,
          logo: true,
          cover: true,
          verified: true,
          name: true,
          Slogan: true,
        },
      },
      posts: true,
      likes: true,
      chatRequests: true,
      sentRequests: true,
      stories: true,
      comments: true,
      
    },
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
    include: {
      profile: {include:{details:{include:{work:{select:{id:true}},education:{select:{id:true}}}}}},       // Include the profile relation
      verified: true,      // Include the verified relation
      networks:{
        include:{
          explore:true,
        },
        where:{verified: true}
      },
      chatRequests: true,
      sentRequests: true,
     
      
    
    },
  });
  return result;
};

const getAllMembersExceptSelfAndRequested = async (memberId: string): Promise<Members[]> => {
  const chatParticipants = await prisma.chat.findMany({
    where: {
      
         memberId // Find chats where memberId is involved
      
    },
    select: {
      members: { select: { id: true } }, // Get all members from those chats
    },
  });

  const membersInChats = new Set(
    chatParticipants.flatMap((chat) => chat.members.map((member) => member.id))
  );

  // Step 2: Find members who are NOT in those chats & never sent/received a chat request
  const result = await prisma.members.findMany({
    where: {
      id: {
        not: memberId, // Exclude the given memberId
        notIn: Array.from(membersInChats), // Exclude members who were in chats with memberId
      },
      chatRequests: {
        none: { senderId: memberId }, // Exclude those who received a request from memberId
      },
      sentRequests: {
        none: { memberId: memberId }, // Exclude those who sent a request to memberId
      },
    },
    include: {
      profile: {
        include: {
          details: {
            include: {
              work: { select: { id: true } },
              education: { select: { id: true } },
            },
          },
        },
      },
      verified: true,
      networks: {
        include: { explore: true },
        where: { verified: true },
      },
    },
  });

  return result;
};




const updateMember = async (req: Request): Promise<Members> => {
  
  const id = req.params.id as string;
  const user = req.body;
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
 
  verifyOTP,
  getoneMember,
  updateMember,
  deleteMember,
  getAllMember,
  getAllMembersExceptSelfAndRequested,
};
