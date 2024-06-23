import { ObjectId } from 'mongodb';
import { AuthTypes } from '../types/auth.type';

export interface IAuthDocument extends Document {
  _id: ObjectId;
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string;
  authType: AuthTypes;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface IRegisterRequestData {
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
  authType?: AuthTypes;
}

export interface IAuthMock {
  fullName?: string;
  username?: string;
  password?: string;
  phoneNumber?: string;
  confirmPassword?: string;
  authType?: AuthTypes;
}
