import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserSchema {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  isActive: boolean;
  followers: number;
  price: number;
}

export const UserSchema: Schema<IUserSchema> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    followers: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre<IUserSchema>('save', async function (next) {
  const user = this as IUserSchema extends Document ? IUserSchema : any;

  try {
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = mongoose.model<IUserSchema>('User', UserSchema);
