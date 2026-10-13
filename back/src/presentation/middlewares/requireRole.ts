import { NextFunction, Request, Response } from 'express';
import { AuthorizationError } from '../../domain/errors/AppError.js';

export const requireRole = (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.auth || !roles.includes(req.auth.role)) {
    throw new AuthorizationError();
  }
  next();
};
