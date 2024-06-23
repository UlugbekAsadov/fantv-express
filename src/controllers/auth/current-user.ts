import { Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { userService } from '../../services/user/user.service';
import { NotFoundError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { ObjectId } from 'mongodb';

export class CurrentUser {
  public async read(req: Request, res: Response) {
    const authId = req.authId as unknown as ObjectId;

    const user = await userService.getUserByAuthId(authId);

    if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);

    return res.status(200).json(user);
  }
}
