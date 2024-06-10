import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from '../utils/interfaces/express.interface';
import { ErrorMessages } from '../utils/enums/error-response.enum';

export function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const bearerToken = req.header('Authorization');

  if (!bearerToken)
    return res.status(401).json({ error: ErrorMessages.ACCESS_DENIED });

  const [_, token] = bearerToken.split(' ');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.userId = decoded.userId;
    req.phoneNumber = decoded.phoneNumber;
    next();
  } catch (error) {
    res.status(401).json({ error: ErrorMessages.INVALID_TOKEN });
  }
}
