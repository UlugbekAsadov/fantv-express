import { Response } from 'express';
import { userService } from '../../services/user/user.service';
import { BadRequestError, NotFoundError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { authService } from '../../services/auth/auth.service';
import { generateJWTToken } from '../../utils/utils';
import HTTPS_STATUS from 'http-status-codes';
import { Request } from '../../utils/interfaces/express.interface';
import { loginSchema } from '../../schemas/auth/login.schema';
import { joiValidation } from '../../utils/decorators/joi-decorator';
import { AuthType } from '../../utils/enums/auth.enum';
import { telegramAuthService } from '../../services/auth/telegram-auth.service';

export class Login {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { phoneNumber, password, authType } = req.body;

    const existingAuth = await authService.getAuthByPhoneNumber(phoneNumber);

    if (!existingAuth) throw new NotFoundError(ErrorMessages.AUTH_NOT_FOUND);

    const isPasswordMatched = await existingAuth.comparePassword(password);

    if (!isPasswordMatched) throw new BadRequestError(ErrorMessages.INVALID_PASSWORD);

    const user = await userService.getUserByAuthId(existingAuth._id);

    if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);

    const token = generateJWTToken(existingAuth, user.id);

    res.status(HTTPS_STATUS.OK).json({ token, user });

    if (authType === AuthType.Teleram) {
      await telegramAuthService.removeTelegramAuthByPhoneNumber(phoneNumber);
    }
  }
}
