import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from '../utils/interfaces/express.interface';
import { ErrorMessages } from '../utils/enums/error-response.enum';
import { userService } from '../services/auth/user.service';
import { UserRoles } from '../utils/enums/user.enum';
import HTTP_STATUS from 'http-status-codes';

export class ProtectedMiddlewares {
  public verifyAuth(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ErrorMessages.TOKEN_NOT_FOUND });

    const [_, token] = bearerToken.split(' ');

    try {
      const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      req.userId = decoded.userId;
      req.authId = decoded.authId;
      next();
    } catch (error) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ErrorMessages.INVALID_TOKEN });
    }
  }

  public async verifyAuthorRole(req: Request, res: Response, next: NextFunction) {
    const { authId } = req;

    if (!authId) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ErrorMessages.ACCESS_DENIED });

    const user = await userService.getUserByAuthId(authId);

    if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ErrorMessages.USER_NOT_FOUND });
    if (!user.isActive) return res.status(HTTP_STATUS.FORBIDDEN).json({ error: ErrorMessages.USER_NOT_ACTIVE });

    const hasAccess = user.roles.some((role) => role === UserRoles.Author);

    if (hasAccess) {
      return next();
    }

    res.status(401).json({ error: ErrorMessages.ACCESS_DENIED });
  }
}
