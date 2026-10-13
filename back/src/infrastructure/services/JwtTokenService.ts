import jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '../../application/services/ITokenService.js';
import { AuthenticationError } from '../../domain/errors/AppError.js';
import { env } from '../config/env.js';

export class JwtTokenService implements ITokenService {
  signAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' });
  }

  signRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    } catch {
      throw new AuthenticationError('Token invalide ou expire');
    }
  }
}
