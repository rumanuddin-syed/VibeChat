import crypto from "crypto";

export const generateOTP = () => {
  // Generate 6-digit numeric OTP
  return crypto.randomInt(100000, 999999).toString();
};

export const isOTPExpired = (expiresAt) => {
  return new Date() > expiresAt;
};