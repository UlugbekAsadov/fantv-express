import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserDocument } from './interfaces/user.interface';
import { IAuthDocument } from './interfaces/auth.interface';
import { ITelegramAuthDocument } from './interfaces/telegram-auth.interface';

export function generateJWTToken(auth: IAuthDocument | ITelegramAuthDocument, userId: string) {
  const jwtToken = jwt.sign({ userId, authId: auth._id, phoneNumber: auth.phoneNumber }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  return jwtToken;
}

export const handleRequest = (fn: Function) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      return await fn(req, res);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
  };
};
