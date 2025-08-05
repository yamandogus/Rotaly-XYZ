import { Request, Response, NextFunction } from "express";
import Prisma from "../config/db";
import { Role } from "@prisma/client";
import { AppError } from "../utils/appError";

/**
 * Email doğrulama kontrolü middleware'i
 */
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

/**
 * Rol bazlı yetkilendirme middleware'i
 */
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

/**
 * Admin rolü kontrolü middleware'i
 */
export const isAdmin = async (
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

    if (req.user.role !== Role.ADMIN) {
      return res.status(403).json({
        status: "error",
        message: "Admin privileges required",
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

/**
 * Otel sahibi kontrolü middleware'i
 */
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

    const hotel = await Prisma.hotel.findUnique({
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
