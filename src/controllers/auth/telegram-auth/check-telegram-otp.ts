import { Response } from 'express';
import { Request } from '../../../utils/interfaces/express.interface';
import { telegramAuthService } from '../../../services/telegram-auth.service';
import { BadRequestError, NotFoundError } from '../../../utils/helper/error-handler';
import { ErrorMessages } from '../../../utils/enums/error-response.enum';
import { generateJWTToken } from '../../../utils/utils';
import { authService } from '../../../services/auth.service';
import HTTP_STATUS from 'http-status-codes';
import { SuccessMessages } from '../../../utils/enums/success-response.enum';
import { joiValidation } from '../../../utils/decorators/joi-decorator';
import { checkTelegramOtpSchema } from '../../../schemas/auth/telegram-auth/check-telegram-otp.schema';

export class CheckTelegramOtp {
  @joiValidation(checkTelegramOtpSchema)
  public async read(req: Request, res: Response) {
    const { otp, deviceId } = req.body;

    const existingTelegramAuth = await telegramAuthService.getTelegramAuthByDeviceId(deviceId);

    if (!existingTelegramAuth) throw new NotFoundError(ErrorMessages.TELEGRAM_AUTH_NOT_FOUND);

    if (new Date(existingTelegramAuth.expireDate).getTime() < new Date().getTime()) throw new BadRequestError(ErrorMessages.OTP_EXPIRED);

    if (existingTelegramAuth.otp !== otp) throw new BadRequestError(ErrorMessages.OTP_DID_NOT_MATCH);

    const existingAuth = await authService.getAuthByPhoneNumber(existingTelegramAuth.phoneNumber);

    if (existingAuth) {
      const jwtToken = generateJWTToken(existingAuth, existingTelegramAuth.id);
      res.status(HTTP_STATUS.OK).json({ token: jwtToken, message: ErrorMessages.USER_EXISTS });
    }

    const jwtToken = generateJWTToken(existingTelegramAuth, existingTelegramAuth.id);

    res.status(HTTP_STATUS.CREATED).json({ token: jwtToken, message: SuccessMessages.USER_CREATED });
  }
}
