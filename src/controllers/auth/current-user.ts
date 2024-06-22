import { NextFunction, Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { userService } from '../../services/auth/user.service';
import { NotFoundError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';

export class CurrentUser {
  public async read(req: Request, res: Response, next: NextFunction) {
    const authId = req.authId as string;

    const user = await userService.getUserByAuthId(authId);

    if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);

    return res.status(200).json(user);
  }
}
