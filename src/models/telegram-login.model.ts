import mongoose, { Schema } from 'mongoose';

interface ITelegramUserSchema {
  deviceId: string;
  phoneNumber: string;
  otp: string;
  expireDate: Date;
  fullName: string;
  username: string;
}

export const TelegramUsersSchema: Schema<ITelegramUserSchema> = new Schema(
  {
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true },
    expireDate: { type: Date, required: true },
    deviceId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const TelegramUsers = mongoose.model<ITelegramUserSchema>(
  'TelegramUsers',
  TelegramUsersSchema,
);
