import { IUserSchema } from '../models/user.model';
import jwt from 'jsonwebtoken';

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
