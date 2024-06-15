import { Response } from 'express';
import { IAuthDocument, IAuthMock } from '../interfaces/auth.interface';
import { IUserDocument } from '../interfaces/user.interface';
import { AuthType } from '../enums/auth.enum';

export const mockAuthRequest = (body: IAuthMock, userId?: string, authId?: string) => {
  return {
    body,
    userId,
    authId,
  };
};

export const mockAuthResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const authMock = {
  _id: '60263f14648fed5246e322d3',
  phoneNumber: '+998919537097',
  username: 'Manny',
  createdAt: '2022-08-31T07:42:24.451Z',
  fullName: 'Manny Sanny',

  save: () => {},
  comparePassword: () => false,
} as unknown as IAuthDocument;

export const mergedAuthAndUserMock = {
  _id: '60263f14648fed5246e322d3',
  phoneNumber: '+998919537097',
  username: 'Manny',
  createdAt: '2022-08-31T07:42:24.451Z',
  fullName: 'Manny Sanny',
  password: '123123',
  email: 'example@gmail.com',
  isActive: true,
  followers: 0,
  price: 0,
  balance: 0,
  profilePhoto: '',
  coverPhoto: '',
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    telegram: '',
  },
} as unknown as IUserDocument;

export const mockRegistrationBody: IAuthMock = {
  username: 'username123',
  password: 'password123',
  phoneNumber: '+998911234567',
  fullName: 'John Doe',
  authType: 'classic',
};
