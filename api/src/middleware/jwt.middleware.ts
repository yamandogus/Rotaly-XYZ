import { Request, Response, NextFunction } from "express";
import jwtService from "../jwt/jwt.service";
import Prisma from "../config/db";

// Token doğrulama middleware'i
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const token = jwtService.extractTokenFromHeader(authHeader);
    const decoded = jwtService.verifyToken(
      token,
      process.env.JWT_ACCESS_SECRET || "secret_access_token"
    );

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error && (error as any).name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: (error as any).message,
      });
    }
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

// Kullanıcı doğrulama durumu kontrolü middleware'i
export const verifiedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    // isVerified kontrolü için prisma sorgusu

    const user = await Prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { isVerified: true },
    });

    if (!user?.isVerified) {
      return res.status(403).json({
        status: "error",
        message: "Email verification required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// İsteğe bağlı token doğrulama
export const optionalAuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }

    const token = jwtService.extractTokenFromHeader(authHeader);
    const decoded = jwtService.verifyToken(
      token,
      process.env.JWT_ACCESS_SECRET || "secret_access_token"
    );

    req.user = decoded;
    next();
  } catch (error) {
    // Token geçersiz olsa bile isteği engelleme
    next();
  }
};
