import mongoose, { Document, Schema } from 'mongoose';
import { IUserDocument } from '../utils/interfaces/user.interface';

export const UserSchema: Schema = new Schema(
  {
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true },
    username: { type: String, required: true, unique: true },
    email: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    followers: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    profilePhoto: { type: String, default: '' },
    coverPhoto: { type: String, default: '' },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    roles: { type: Array, default: ['USER'] },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
