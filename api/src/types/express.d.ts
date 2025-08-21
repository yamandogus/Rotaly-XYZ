export interface TokenPayload {
  userId: string;
  role?: string;
  jti?: string;
  iat?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
