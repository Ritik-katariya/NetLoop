import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';

export const AdminRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized');
      }

      const isAuthorized = roles.includes(userRole);

      if (!isAuthorized) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized to perform this action'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};