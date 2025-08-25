import { Request, Response, NextFunction } from "express";
import { JwtService } from "../jwt/jwt.service";
import { PrismaClient } from "@prisma/client";

const jwtService = new JwtService();
const prisma = new PrismaClient();

// Token doğrulama middleware'i
export const authenticateToken = async (
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

    // Kullanıcının revoked tokenlarını kontrol et
    const revokedTokens = await prisma.token.findMany({
      where: {
        userId: decoded.userId,
        revokedAt: { not: null },
      },
      orderBy: { revokedAt: "desc" },
      take: 1,
    });

    // Eğer revoked token varsa ve token oluşturma zamanından sonra revoke edilmişse
    if (revokedTokens.length > 0) {
      const tokenIat = decoded.iat ?? 0; // iat saniye cinsinden
      const revokedAtSec = revokedTokens[0].revokedAt
        ? Math.floor(revokedTokens[0].revokedAt.getTime() / 1000)
        : 0;
  
      if (revokedAtSec > tokenIat) {
        return res.status(401).json({
          status: "error",
          message: "Token has been revoked",
        });
      }
    }

    req.user = decoded;
    return next();
  } catch (error) {
    if (error instanceof Error && (error as any).name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: (error as any).message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// İsteğe bağlı token doğrulama
export const optionalAuthenticateToken = async (
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

    // Kullanıcının revoked tokenlarını kontrol et
    const revokedTokens = await prisma.token.findMany({
      where: {
        userId: decoded.userId,
        revokedAt: { not: null },
      },
      orderBy: { revokedAt: "desc" },
      take: 1,
    });

    // Eğer revoked token varsa ve token oluşturma zamanından sonra revoke edilmişse
    if (revokedTokens.length > 0) {
      const tokenIat = decoded.iat ?? 0; // iat saniye cinsinden
      const revokedAtSec = revokedTokens[0].revokedAt
        ? Math.floor(revokedTokens[0].revokedAt.getTime() / 1000)
        : 0;
  
      if (revokedAtSec > tokenIat) {
        return res.status(401).json({
          status: "error",
          message: "Token has been revoked",
        });
      }
    }

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
