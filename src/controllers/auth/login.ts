import { NextFunction, Response } from 'express';
import { userService } from '../../services/user.service';
import { BadRequestError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { authService } from '../../services/auth.service';
import { generateJWTToken } from '../../utils/utils';
import HTTPS_STATUS from 'http-status-codes';
import { Request } from '../../utils/interfaces/express.interface';

export class Login {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phoneNumber, password } = req.body;

    const existingAuth = await authService.getAuthByPhoneNumber(phoneNumber);

    if (!existingAuth) return next(new BadRequestError(ErrorMessages.USER_NOT_FOUND));

    const isPasswordMatched = await existingAuth.comparePassword(password);

    if (!isPasswordMatched) return next(new BadRequestError(ErrorMessages.INVALID_PASSWORD));

    const user = await userService.getUserByAuthId(existingAuth._id);

    const token = generateJWTToken(existingAuth, user.id);

    res.status(HTTPS_STATUS.OK).json({ token, user });
  }
}
