import { NextFunction, Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { userService } from '../../services/auth/user.service';

export class CurrentUser {
  public async read(req: Request, res: Response, next: NextFunction) {
    const authId = req.authId as string;

    const user = await userService.getUserByAuthId(authId);

    return res.status(200).json(user);
  }
}
