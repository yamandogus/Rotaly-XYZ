import { UserRepository } from "./repository";
import { RegisterSchemaType, UpdateUserSchemaType } from "../../dto/auth";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError";

export class UserService {
  static async getAll() {
    const users = await UserRepository.findAll();
    if (!users || users.length === 0) {
      throw new AppError("Users not found", 404);
    }
    return users;
  }

  static async getById(id: string) {
    const user = await UserRepository.findById(id);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async getByEmail(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async getByPhone(phone: string) {
    const user = await UserRepository.findByPhone(phone);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async checkEmailUnique(
    email: string,
    excludeUserId?: string
  ): Promise<void> {
    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser && (!excludeUserId || existingUser.id !== excludeUserId)) {
      throw new AppError("Email address is already in use", 409);
    }
  }
  static async add(data: RegisterSchemaType) {
    await this.checkEmailUnique(data.email);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return UserRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  static async update(id: string, data: UpdateUserSchemaType) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (data.email && data.email !== user.email) {
      await this.checkEmailUnique(data.email, id);
    }
    return UserRepository.update(id, data);
  }

  // google ile girmeye çalışan kişi kayıtlı mı değil mi
  static async getByGoogleId(googleId: string) {
    const user = await UserRepository.findByGoogleId(googleId);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
  // önce google ile giriyosa önce var mı yok mu kontrol et sonra kaydet
  static async createWithGoogle(profile: any) {
    try {
      const existUser = await UserRepository.findByGoogleId(profile.id);
      if (existUser) {
        return existUser;
      }
      const newUser = await UserRepository.create({
        email: profile.email,
        name: profile.name,
        password: null,
        googleId: profile.id,
      });
    } catch (error) {
      throw new AppError("Failed to create user", 500);
    }
  }

  static async handleGoogleLogin(profile: any) {
    try {
      let user = await UserRepository.findByEmail(profile.emails[0].value);

      if (user) {
        // 2. Kullanıcı varsa, Google ID'sini kontrol et
        if (!user.googleId) {
          // 3. Google ID'si yoksa, ekle
          user = await UserRepository.updateGoogleId(user.id, profile.id);
        } else if (user.googleId !== profile.id) {
          // 4. Google ID'si varsa ve farklıysa, hata ver (isteğe bağlı)
          throw new Error(
            "Bu email adresi farklı bir Google hesabı ile ilişkilendirilmiş."
          );
        }
      } else {
        // 5. Kullanıcı yoksa, yeni bir Google kullanıcısı oluştur
        const createdUser = await this.createWithGoogle(profile);
        if (!createdUser) {
          throw new AppError("Kullanıcı oluşturulamadı", 500);
        }
        user = createdUser;
      }

      return user;
    } catch (error) {
      throw new AppError("google login işlemi sırasında hata oluştu", 400);
    }
  }

  static async delete(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return UserRepository.delete(id);
  }
}
