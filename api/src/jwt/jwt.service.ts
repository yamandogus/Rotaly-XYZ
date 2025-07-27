import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { TokenPayload } from "../types/express";

class JwtService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private extractTokenFromHeader(authorizationHeader: string): string {
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      const error = new Error("Invalid or missing Authorization header");
      error.name = "UnauthorizedError";
      throw error;
    }
    return authorizationHeader.split(" ")[1];
  }

  private async checkToken(jti: string) {
    const token = await this.prisma.token.findUnique({
      where: {
        id: jti,
      },
    });

    if (!token) {
      const error = new Error("Invalid token");
      error.name = "UnauthorizedError";
      throw error;
    }

    if (token.expiresAt < new Date()) {
      const error = new Error("Token expired");
      error.name = "UnauthorizedError";
      throw error;
    }

    if (token.revokedAt) {
      const error = new Error("Token has been revoked");
      error.name = "UnauthorizedError";
      throw error;
    }

    return token;
  }

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || "secret_access_token",
      {
        expiresIn: "15m",
      }
    );
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    const refreshTokenRecord = await this.prisma.token.create({
      data: {
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return jwt.sign(
      { userId: payload.userId, jti: refreshTokenRecord.id },
      process.env.JWT_REFRESH_SECRET || "secret_refresh_token",
      {
        expiresIn: "7d",
      }
    );
  }

  verifyToken(token: string, secret: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, secret) as TokenPayload;
      if (!decoded) {
        const error = new Error("Invalid token");
        error.name = "UnauthorizedError";
        throw error;
      }
      return decoded;
    } catch (error) {
      console.log((error as Error).message);
      const newError = new Error("Invalid token");
      newError.name = "UnauthorizedError";
      throw newError;
    }
  }

  async logout(authorizationHeader: string) {
    const refreshToken = this.extractTokenFromHeader(authorizationHeader);

    const decoded = this.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "secret_refresh_token"
    );

    if (!decoded.jti) {
      const error = new Error("Invalid token");
      error.name = "UnauthorizedError";
      throw error;
    }

    const token = await this.checkToken(decoded.jti);

    await this.prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return {
      message: "Logged out successfully",
    };
  }

  async refresh(authorizationHeader: string) {
    const refreshToken = this.extractTokenFromHeader(authorizationHeader);

    const decoded = this.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "secret_refresh_token"
    );

    if (!decoded.jti) {
      const error = new Error("Invalid token");
      error.name = "UnauthorizedError";
      throw error;
    }

    const token = await this.checkToken(decoded.jti);

    await this.prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    const accessToken = this.generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    const renewedRefreshToken = await this.generateRefreshToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    return {
      message: "Token refreshed successfully",
      accessToken,
      renewedRefreshToken,
    };
  }

  async logoutAll(authorizationHeader: string) {
    const refreshToken = this.extractTokenFromHeader(authorizationHeader);

    const decoded = this.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "secret_refresh_token"
    );

    if (!decoded.jti) {
      const error = new Error("Invalid token");
      error.name = "UnauthorizedError";
      throw error;
    }

    await this.checkToken(decoded.jti);

    await this.prisma.token.updateMany({
      where: {
        userId: decoded.userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return {
      message: "Logged out from all devices successfully",
    };
  }
}

export default new JwtService();
