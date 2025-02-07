import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';

export const SuperAdminRole = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!userRole || userRole !== 'SUPER_ADMIN') {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'Only Super Admin can access this resource'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}; 