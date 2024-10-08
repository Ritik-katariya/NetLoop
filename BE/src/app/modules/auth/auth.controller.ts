import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";


const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { accessToken } = result;

    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true
    }
    res.cookie('accessToken', accessToken, cookieOptions)
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Logged !!',
        success: true,
        data: result,
    })
});


const resetpassword = catchAsync(async (req: Request, res: Response) => {
    const result =await AuthService.resetpassword(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Password Reset Successfully!!',
        success: true,
        data: result,
    })
});


export const authController={
    login,
    resetpassword
}