import mongoose, { Schema } from 'mongoose';
import { ITelegramAuthDocument } from '../utils/interfaces/telegram-auth.interface';

export const TelegramAuthSchema: Schema = new Schema(
  {
    fullName: { type: String, default: '' },
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true },
    expireDate: { type: Date, required: true },
    deviceId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const TelegramAuthModel = mongoose.model<ITelegramAuthDocument>('TelegramAuth', TelegramAuthSchema);
