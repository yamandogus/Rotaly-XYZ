import Prisma from "../../config/db";
import { PrismaClient, Role } from "@prisma/client";
import { JwtService } from "../../jwt/jwt.service";
import { AppError } from "../../utils/appError";
import { generateOTP } from "../../utils/otp";
import bcrypt from "bcrypt";
import {
  LoginSchemaType,
  RegisterSchemaType,
  UpdateUserSchemaType,
  ChangePasswordSchemaType,
  ResetPasswordSchemaType,
  ProfileSchemaType,
} from "../../dto/auth";
import { EmailService } from "../email/service";
import { UserService } from "../user/service";
import { TokenPayload } from "../../types/express";

export class AuthService {
  private prisma: PrismaClient;
  private emailService: EmailService;
  private userService: UserService;
  private jwtService: JwtService;

  constructor() {
    this.prisma = new PrismaClient();
    this.emailService = new EmailService();
    this.userService = new UserService();
    this.jwtService = new JwtService();
  }

  async register(data: RegisterSchemaType) {
    const user = await this.userService.add(data);
    const otp = generateOTP();

    await this.emailService.sendWelcomeEmail(user.email, user.name);
    await this.emailService.sendVerificationEmail(user.email, user.name, otp);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verificationOTP: otp,
        verificationOTPExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    return {
      message:
        "Registration successful. Please check your email for verification.",
    };
  }

  async login(data: LoginSchemaType) {
    const user = await this.userService.getByEmail(data.email);
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }
    if (!user.isVerified) {
      throw new AppError("Please verify your email first", 401);
    }
    const accessToken = this.jwtService.generateAccessToken({
      userId: user.id,
      role: user.role,
    });
    const refreshToken = await this.jwtService.generateRefreshToken({
      userId: user.id,
      role: user.role,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(authorizationHeader: string) {
    await this.jwtService.logout(authorizationHeader);
    return {
      message: "Logged out successfully",
    };
  }

  async verifyEmail(userId: string | undefined, verificationOTP: string) {
    if (!userId) {
      throw new AppError("Login first", 401);
    }

    const user = await this.userService.getById(userId);

    if (user.isVerified) {
      throw new AppError("User already verified", 400);
    }

    if (!user.verificationOTP || user.verificationOTP !== verificationOTP) {
      throw new AppError("Invalid or expired verification OTP", 400);
    }

    // will add a cron job to clear expired OTPs or smt else ???
    /*     if (new Date() > user.verificationOTPExpires) {
      throw new AppError("Verification OTP has expired", 400);
    } */

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
        verificationOTP: null,
        verificationOTPExpires: null,
      },
    });

    return {
      message: "Email verified successfully",
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.userService.getByEmail(email);
    const otp = generateOTP();
    if (user.isVerified) {
      throw new AppError("user already verified", 400);
    }

    await this.emailService.sendVerificationEmail(user.email, user.name, otp);
    return {
      message: "Verification email sent",
    };
  }
  //TODO
  //   async getProfile(userId: string): Promise<ProfileSchemaType> {
  //     const user = await this.userService.getById(userId);
  //   }

  async updateProfile(userId: string, data: UpdateUserSchemaType) {
    const otp = generateOTP();
    const user = await this.userService.getById(userId);
    if (data.email && data.email !== user.email) {
      await this.userService.checkEmailUnique(data.email, userId);

      user.isVerified = false;
      const verificationToken = this.jwtService.generateAccessToken({
        userId: user.id,
        role: user.role,
      });
      await this.emailService.sendVerificationEmail(data.email, user.name, otp);
    }
    const updateUser = await this.userService.update(user.id, data);
    return {
      message:
        data.email !== user.email
          ? "Profile updated successfully. Please verify your new email."
          : "Profile updated successfully",
      updatedUser: updateUser,
    };
  }
  async forgotPassword(email: string) {
    const otp = generateOTP();
    const user = await this.userService.getByEmail(email);
    await this.emailService.sendPasswordResetEmail(user.email, user.name, otp);
    return {
      message: "Reset password email sent",
    };
  }

  async changePassword(userId: string, data: ChangePasswordSchemaType) {
    const user = await this.userService.getById(userId);
    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid current password", 401);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.newPassword, saltRounds);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hashedPassword,
      },
    });
    return {
      message: "Password changed successfully",
    };
  }

  async deleteAccount(userId: string) {
    const user = await this.userService.getById(userId);
    this.jwtService.logoutAll(`Bearer ${user.id}`);
    await this.userService.delete(userId);
    return {
      message: "Account deleted successfully",
    };
  }
}
