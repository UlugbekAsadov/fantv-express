import { Document } from 'mongoose';

export interface ITelegramAuthDocument extends Document {
  deviceId: string;
  phoneNumber: string;
  otp: string;
  expireDate: Date;
  fullName: string;
  username: string;
}
