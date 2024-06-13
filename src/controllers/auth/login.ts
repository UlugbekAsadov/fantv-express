import { NextFunction, Response } from 'express';
import { userService } from '../../services/user.service';
import { BadRequestError, NotFoundError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { authService } from '../../services/auth.service';
import { generateJWTToken } from '../../utils/utils';
import HTTPS_STATUS from 'http-status-codes';
import { Request } from '../../utils/interfaces/express.interface';
import { loginSchema } from '../../schemas/auth/login.schema';
import { joiValidation } from '../../utils/decorators/joi-decorator';
import { AuthType } from '../../utils/enums/auth.enum';

export class Login {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response, next: NextFunction): Promise<void | boolean> {
    const { phoneNumber, password, authType } = req.body;

    const existingAuth = await authService.getAuthByPhoneNumber(phoneNumber);

    if (!existingAuth) return next(new BadRequestError(ErrorMessages.AUTH_NOT_FOUND));

    const isPasswordMatched = await existingAuth.comparePassword(password);

    if (!isPasswordMatched) return next(new BadRequestError(ErrorMessages.INVALID_PASSWORD));

    const user = await userService.getUserByAuthId(existingAuth._id);

    if (!user) return next(new NotFoundError(ErrorMessages.USER_NOT_FOUND));

    const token = generateJWTToken(existingAuth, user.id);

    res.status(HTTPS_STATUS.OK).json({ token, user });

    if (authType === AuthType.Teleram) return true;
  }
}
