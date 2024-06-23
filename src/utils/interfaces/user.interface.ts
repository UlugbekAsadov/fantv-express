import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserRoles } from '../enums/user.enum';

export interface IUserDocument extends Document {
  _id:  ObjectId;
  username: string;
  email?: string;
  phoneNumber: string;
  fullName: string;
  isActive: boolean;
  followers: number;
  price: number;
  balance: number;
  profilePhoto: string;
  coverPhoto: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    telegram?: string;
  };
  roles: UserRoles[];
  comparePassword(password: string): Promise<boolean>;
}
