// import {
//   RegisterSchemaType,
//   LoginSchemaType,
//   ResetPasswordSchemaType,
//   VerifyEmailSchemaType,
// } from "../../dto/auth/index";
// import * as bcrypt from "bcrypt";
// import { JwtService } from "../../jwt/jwt.service";
// import { UserRepository } from "../user/repository";

// const userRepository = new UserRepository();

// export const authService = {
//   async register(registerDTO: RegisterSchemaType) {
//     const existUser = await userRepository.findByEmail(registerDTO.email);
//     if (existUser) {
//       throw new Error("User already exist");
//     }
//     const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
//   },
// };
