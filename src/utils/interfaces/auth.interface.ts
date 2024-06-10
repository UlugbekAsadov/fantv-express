import { IUserSchema } from '../../models/user.model';

export interface IRegister {
  username?: string;
  password: string;
  email?: string;
  phoneNumber: string;
  fullName?: string;
  isActive?: boolean;
  followers?: number;
  price?: number;
}

export interface IRegisterResponse {
  access_token: string;
  user: IUserSchema;
}

export interface ILogin {
  phoneNumber: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  user: IUserSchema;
}

export interface IChangePassword {
  userId: string;
  password: string;
  confirmPassword: string;
}

export interface ITelegramLoginRequest {
  otp: string;
  deviceId: string;
}

export interface ITelegramCreateUser {
  userId: string;
  password: string;
  confirmPassword: string;
}

export interface ITelegramUser {
  deviceId: string;
  otp: string;
  phoneNumber: string;
  password?: string;
  expireDate: Date;
  fullName: string;
  username: string;
}
