import { IUserSchema } from '../../models/user.model';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  user: IUserSchema;
}

export interface IForgotPassword {
  userId: string;
  password: string;
  confirmPassword: string;
}
