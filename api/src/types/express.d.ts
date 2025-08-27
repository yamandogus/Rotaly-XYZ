import { Request } from 'express';

export interface TokenPayload {
  userId: string;
  role?: string;
  jti?: string;
  iat?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
