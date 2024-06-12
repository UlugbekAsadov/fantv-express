import { NextFunction, Response } from 'express';
import { Request } from '../../../utils/interfaces/express.interface';
import { Login } from '../login';
import { telegramAuthService } from '../../../services/telegram-auth.service';
import { ErrorMessages } from '../../../utils/enums/error-response.enum';
import { BadRequestError } from '../../../utils/helper/error-handler';

export class CheckTelegramPassword {
  public async read(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const telegramAuthId = req.userId as string;

    const existingTelegramAuth = await telegramAuthService.getTelegramAuthById(telegramAuthId);

    if (!existingTelegramAuth) {
      return next(new BadRequestError(ErrorMessages.OTP_EXPIRED));
    }

    req.body.password = password;
    req.body.phoneNumber = existingTelegramAuth.phoneNumber;

    await Login.prototype.read(req, res, next);

    await telegramAuthService.removeTelegramAuthById(telegramAuthId);
  }
}
