import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from '../utils/interfaces/express.interface';
import { ErrorMessages } from '../utils/enums/error-response.enum';

export class AuthMiddlewares {
  public verifyUser(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) return res.status(401).json({ error: ErrorMessages.ACCESS_DENIED });

    const [_, token] = bearerToken.split(' ');

    try {
      const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      req.userId = decoded.userId;
      req.authId = decoded.authId;
      next();
    } catch (error) {
      res.status(401).json({ error: ErrorMessages.INVALID_TOKEN });
    }
  }
}
