// src/jwt/jwt.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwtService from "../jwt/jwt.service";
import { Role } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

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
    if (error.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: error.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Rol bazlı yetkilendirme middleware'i
export const authorizeRoles = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "Authentication required",
        });
      }

      if (!roles.includes(req.user.role as Role)) {
        return res.status(403).json({
          status: "error",
          message: "You do not have permission to perform this action",
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
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
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

// Otel sahibi kontrolü middleware'i
export const isHotelOwner = async (
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

    const hotelId = req.params.hotelId || req.body.hotelId;
    if (!hotelId) {
      return res.status(400).json({
        status: "error",
        message: "Hotel ID is required",
      });
    }

    const prisma = new PrismaClient();
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      select: { ownerId: true },
    });

    if (!hotel) {
      return res.status(404).json({
        status: "error",
        message: "Hotel not found",
      });
    }

    if (hotel.ownerId !== req.user.userId) {
      return res.status(403).json({
        status: "error",
        message:
          "You do not have permission to perform this action on this hotel",
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

// auth.middleware.ts
// validate.middleware.t

// errorhandler
