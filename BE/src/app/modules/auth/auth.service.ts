import bcrypt from 'bcrypt';
import prisma from "../../../shared/prisma";
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { JwtHelper } from '../../../helper/jwtToken';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import moment from 'moment';
const { v4: uuidv4 } = require('uuid');
import * as path from 'path';

type ILginResponse = {
    accessToken?: string;
    user: {}
}

const loginUser = async (user: any): Promise<ILginResponse> => {
    const { email, password } = user;
    const isUserExist = await prisma.auth.findUnique({
        where: { email}
    })

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    // check Verified doctor or not
    if (isUserExist.role === 'Owner') {
        const getOwnerInfo = await prisma.owner.findUnique({
            where: {
                email: isUserExist.email
            }
        })
        if (getOwnerInfo && getOwnerInfo?.status === false) {
            throw new ApiError(httpStatus.NOT_FOUND, "Please Verify Your Email First !");
        }
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
    }
    const { role,id } = isUserExist;
    const accessToken = JwtHelper.createToken(
        { role, id },
        config.jwt.secret as Secret,
        config.jwt.JWT_EXPIRES_IN as string
    )
    return { accessToken, user: { role, id } }
}


const resetpassword=async (user:any):Promise<any> => {
    const {email, password,newpassword}=user;
    const isUserExist = await prisma.auth.findUnique({
        where: { email}
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    const issame=await bcrypt.compare(password,isUserExist.password); 
    if (!issame) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await prisma.auth.update({
        where: { email },
        data: { password: hashedPassword },
    });
    return { message: "Password reset successfully" };
    
}

export const AuthService={
    loginUser,
    resetpassword
}