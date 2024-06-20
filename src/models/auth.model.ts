import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IAuthDocument } from '../utils/interfaces/auth.interface';

const SALT_ROUND = 10;

export const AuthSchema: Schema = new Schema(
  {
    fullName: { type: String, default: '' },
    username: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String },
    authType: { type: String, default: 'classic' },
  },
  { timestamps: true },
);

AuthSchema.pre<IAuthDocument>('save', async function (next) {
  const user = this as any;

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

AuthSchema.methods.comparePassword = async function (this: IAuthDocument, password: string) {
  const hashedPassword: string = (this as unknown as IAuthDocument).password!;

  return await bcrypt.compare(password, hashedPassword);
};

AuthSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUND);
};

export const AuthModel: mongoose.Model<IAuthDocument> = mongoose.model<IAuthDocument>('Auth', AuthSchema);
