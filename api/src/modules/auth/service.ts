import { JwtService } from "../../jwt/jwt.service";
import { AppError } from "../../utils/appError";
import { generateOTP } from "../../utils/otp";
import bcrypt from "bcrypt";
import {
  LoginSchemaType,
  RegisterSchemaType,
  UpdateUserSchemaType,
  ChangePasswordSchemaType,
} from "../../dto/auth";
import { EmailService } from "../email/service";
import { UserService } from "../user/service";

export class AuthService {
  private emailService: EmailService;
  private jwtService: JwtService;

  constructor() {
    this.emailService = new EmailService();
    this.jwtService = new JwtService();
  }

  async register(data: RegisterSchemaType) {
    const user = await UserService.add(data);
    const otp = generateOTP();

    await this.emailService.sendWelcomeEmail(user.email, user.name);
    await this.emailService.sendVerificationEmail(user.email, user.name, otp);
    await UserService.updateVerificationOTP(user.id, otp);

    return {
      message:
        "Registration successful. Please check your email for verification.",
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async login(data: LoginSchemaType) {
    const user = await UserService.getByEmail(data.email);
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.hashedPassword as string
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
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
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      },
    };
  }

  async logout(authorizationHeader: string) {
    const token = this.jwtService.extractTokenFromHeader(authorizationHeader);
    try {
      // Önce access token olarak dene
      return await this.jwtService.logout(
        token,
        process.env.JWT_ACCESS_SECRET || "secret_access_token"
      );
    } catch (error) {
      // Access token başarısız olursa refresh token olarak dene
      return await this.jwtService.logout(
        token,
        process.env.JWT_REFRESH_SECRET || "secret_refresh_token"
      );
    }
  }

  async verifyEmail(userId: string | undefined, verificationOTP: string) {
    if (!userId) {
      throw new AppError("Login first", 401);
    }
    const user = await UserService.getById(userId);
    if (user.isVerified) {
      throw new AppError("User already verified", 400);
    }
    console.log(user.verificationOTP);
    console.log(verificationOTP);
    if (!user.verificationOTP || user.verificationOTP !== verificationOTP) {
      throw new AppError("Invalid or expired verification OTP", 400);
    }

    await UserService.verifyUserEmail(userId);

    return {
      message: "Email verified successfully",
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await UserService.getByEmail(email);
    if (user.isVerified) {
      throw new AppError("user already verified", 400);
    }
    const otp = generateOTP();
    await this.emailService.sendVerificationEmail(user.email, user.name, otp);
    await UserService.updateVerificationOTP(user.id, otp);
    return {
      message: "Verification email sent",
    };
  }

  async updateProfile(userId: string, data: UpdateUserSchemaType) {
    const user = await UserService.getById(userId);
    if (data.email && data.email !== user.email) {
      await UserService.checkEmailUnique(data.email, userId);

      user.isVerified = false;
      const verificationToken = this.jwtService.generateAccessToken({
        userId: user.id,
        role: user.role,
      });
      const otp = generateOTP();
      await this.emailService.sendVerificationEmail(data.email, user.name, otp);
    }
    const updateUser = await UserService.update(user.id, data);
    return {
      message:
        data.email !== user.email
          ? "Profile updated successfully. Please verify your new email."
          : "Profile updated successfully",
      updatedUser: updateUser,
    };
  }
  async refreshToken(authorizationHeader: string) {
    await this.jwtService.refresh(authorizationHeader);
  }

  async forgotPassword(email: string) {
    const user = await UserService.getByEmail(email);

    const otp = generateOTP();
    await this.emailService.sendPasswordResetEmail(user.email, user.name, otp);
    await UserService.updateVerificationOTP(user.id, otp);

    return {
      message: "Reset password email sent",
    };
  }

  async changePassword(userId: string, data: ChangePasswordSchemaType) {
    const user = await UserService.getById(userId);
    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.hashedPassword as string
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid current password", 401);
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await UserService.updatePassword(userId, hashedPassword);

    return {
      message: "Password changed successfully",
    };
  }

  async deleteAccount(userId: string) {
    const user = await UserService.getById(userId);
    await UserService.delete(userId);
    this.jwtService.logoutAll(user.id);
    return {
      message: "Account deleted successfully",
    };
  }
}
