/**
 * Generates a 6-digit OTP (One-Time Password)
 * @returns {string} - A 6-digit OTP as a string
 */
export function generateOTP(): string {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}
