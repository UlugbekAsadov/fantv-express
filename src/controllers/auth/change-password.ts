import { Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { authService } from '../../services/auth/auth.service';
import HTTP_STATUS from 'http-status-codes';
import { hash } from 'bcrypt';
import { SuccessMessages } from '../../utils/enums/success-response.enum';
import { joiValidation } from '../../utils/decorators/joi-decorator';
import { changePasswordSchema } from '../../schemas/auth/change-password.schema';

export class ChangePassword {
  @joiValidation(changePasswordSchema)
  public async update(req: Request, res: Response): Promise<void> {
    const { password } = req.body;
    const authId = req.authId as string;

    const hashedPassword = await hash(password, 10);

    await authService.changeAuthPassword(authId, hashedPassword);

    res.status(HTTP_STATUS.OK).json({ message: SuccessMessages.USER_PASSWORD_UPDATED });
  }
}
