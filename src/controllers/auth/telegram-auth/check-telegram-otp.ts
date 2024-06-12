import { NextFunction, Response } from 'express';
import { Request } from '../../../utils/interfaces/express.interface';
import { telegramAuthService } from '../../../services/telegram-auth.service';
import { BadRequestError, NotFoundError } from '../../../utils/helper/error-handler';
import { ErrorMessages } from '../../../utils/enums/error-response.enum';
import { generateJWTToken } from '../../../utils/utils';
import { authService } from '../../../services/auth.service';
import HTTP_STATUS from 'http-status-codes';
import { SuccessMessages } from '../../../utils/enums/success-response.enum';

export class CheckTelegramOtp {
  public async read(req: Request, res: Response, next: NextFunction) {
    const { otp, deviceId } = req.body;

    const existingTelegramUser = await telegramAuthService.getTelegramAuthByDeviceId(deviceId);

    if (!existingTelegramUser) {
      return next(new NotFoundError(ErrorMessages.USER_NOT_FOUND));
    }

    if (new Date(existingTelegramUser.expireDate).getTime() < new Date().getTime()) {
      return next(new BadRequestError(ErrorMessages.OTP_EXPIRED));
    }

    if (existingTelegramUser.otp !== otp) {
      return next(new BadRequestError(ErrorMessages.OTP_DID_NOT_MATCH));
    }

    const auth = await authService.getAuthByPhoneNumber(existingTelegramUser.phoneNumber);

    if (auth) {
      const jwtToken = generateJWTToken(auth, existingTelegramUser.id);
      return res.status(HTTP_STATUS.OK).json({ token: jwtToken, message: ErrorMessages.USER_EXISTS });
    }

    const jwtToken = generateJWTToken(existingTelegramUser, existingTelegramUser.id);

    return res.status(HTTP_STATUS.CREATED).json({ token: jwtToken, message: SuccessMessages.USER_CREATED });
  }
}
