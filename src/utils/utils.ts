import { Request, Response } from 'express';
import { IUserSchema } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { Error } from './interfaces/express.interface';

export function generateJWTToken(
  user: IUserSchema extends Document ? IUserSchema : any,
) {
  const { _id: userId, phoneNumber } = user;
  const jwtToken = jwt.sign(
    { userId, phoneNumber },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    },
  );

  return jwtToken;
}

export const handleRequest = (fn: Function) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      return await fn(req, res);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  };
};
