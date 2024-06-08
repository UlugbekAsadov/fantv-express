import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from '../utils/interfaces/express.interface';

export function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) return res.status(401).json({ error: 'Access denied' });

  const [_, token] = bearerToken.split(' ');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
