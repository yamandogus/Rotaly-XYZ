import { Request, Response, NextFunction } from "express";
import { JwtService } from "../jwt/jwt.service";

const jwtService = new JwtService();
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
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
