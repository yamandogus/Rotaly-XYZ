import crypto from "crypto";

/**
 * Generate a random OTP (One-Time Password)
 * @param length - Length of the OTP, default is 6
 * @return string - Generated OTP
 */
export function generateOTP(length: number = 6): string {
  const buffer = crypto.randomBytes(length);
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += (buffer[i] % 10).toString();
  }

  return otp;
}
