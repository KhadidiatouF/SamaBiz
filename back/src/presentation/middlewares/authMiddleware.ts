import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../../domain/errors/AppError.js';
import { ITokenService, TokenPayload } from '../../application/services/ITokenService.js';

declare global {
  namespace Express {
    interface Request {
      auth?: TokenPayload;
    }
  }
}

export const authMiddleware = (tokenService: ITokenService) => (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    throw new AuthenticationError();
  }

  req.auth = tokenService.verifyAccessToken(authorization.slice('Bearer '.length));
  next();
};
