import { ObjectId } from 'mongoose';

export interface IAuthDocument extends Document {
  _id: string | ObjectId;
  username: string;
  password?: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
