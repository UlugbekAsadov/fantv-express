import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IAuthDocument } from '../utils/interfaces/new.auth.interface';

const SALT_ROUND = 10;

export const AuthSchema: Schema = new Schema({
  fullName: { type: String },
  userName: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  password: { type: String },
});

AuthSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword = await bcrypt.hash(this.password as string, SALT_ROUND);

  this.password = hashedPassword;

  next();
});

AuthSchema.methods.comparePassword = async function (
  this: IAuthDocument,
  password: string,
) {
  const hashedPassword: string = (this as unknown as IAuthDocument).password!;

  return await bcrypt.compare(password, hashedPassword);
};

AuthSchema.methods.hashPassword = async function (
  password: string,
): Promise<string> {
  return bcrypt.hash(password, SALT_ROUND);
};

export const AuthModel: mongoose.Model<IAuthDocument> = mongoose.model<IAuthDocument>('Auth', AuthSchema );
