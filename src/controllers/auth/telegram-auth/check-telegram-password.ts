import { Response } from 'express';
import { Request } from '../../../utils/interfaces/express.interface';
import { Login } from '../login';
import { telegramAuthService } from '../../../services/auth/telegram-auth.service';
import { ErrorMessages } from '../../../utils/enums/error-response.enum';
import { BadRequestError } from '../../../utils/helper/error-handler';
import { joiValidation } from '../../../utils/decorators/joi-decorator';
import { checkTelegramPasswordSchema } from '../../../schemas/auth/telegram-auth/check-telegram-password.schema';
import { AuthType } from '../../../utils/enums/auth.enum';

export class CheckTelegramPassword {
  @joiValidation(checkTelegramPasswordSchema)
  public async read(req: Request, res: Response) {
    const { password } = req.body;
    const telegramAuthId = req.userId?.toString() as string;

    const existingTelegramAuth = await telegramAuthService.getTelegramAuthById(telegramAuthId);

    if (!existingTelegramAuth) throw new BadRequestError(ErrorMessages.OTP_EXPIRED);

    req.body.password = password;
    req.body.phoneNumber = existingTelegramAuth.phoneNumber;
    req.body.authType = AuthType.Teleram;

    await Login.prototype.read(req, res);
  }
}
