import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/apiError';
import { JwtHelper } from '../../helper/jwtToken';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        status: boolean;
      };
    }
  }
}

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get authorization token
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Verify token
    const verifiedUser = JwtHelper.verifyToken(token, config.jwt.secret as Secret);

    // Check if verified user has required properties
    if (!verifiedUser || typeof verifiedUser !== 'object') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const { id, role, status } = verifiedUser;
console.log(verifiedUser);
    // Verify role is member
    // if (role !== 'member') {
    //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden: Member access required');
    // }

    // Check user status
    if (!status) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Account is inactive');
    }

    // Set user info in request object
    req.user = {
      id,
      role,
      status
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default auth; 