import { Response } from 'express';
import { Request } from '../../../utils/interfaces/express.interface';
import { telegramAuthService } from '../../../services/auth/telegram-auth.service';
import { Register } from '../register';
import { BadRequestError } from '../../../utils/helper/error-handler';
import { ErrorMessages } from '../../../utils/enums/error-response.enum';
import { joiValidation } from '../../../utils/decorators/joi-decorator';
import { changePasswordSchema } from '../../../schemas/auth/change-password.schema';
import { AuthType } from '../../../utils/enums/auth.enum';

export class SetTelegramPassword {
  @joiValidation(changePasswordSchema)
  public async update(req: Request, res: Response) {
    const { password } = req.body;
    const telegramAuthId = req.userId?.toString() as string;

    const telegramAuth = await telegramAuthService.getTelegramAuthById(telegramAuthId);

    if (!telegramAuth) throw new BadRequestError(ErrorMessages.OTP_EXPIRED);

    req.body.password = password;
    req.body.username = telegramAuth.username;
    req.body.phoneNumber = telegramAuth.phoneNumber;
    req.body.fullName = telegramAuth.fullName;
    req.body.authType = AuthType.Teleram;
    delete req.body.confirmPassword;

    await Register.prototype.create(req, res);
  }
}
