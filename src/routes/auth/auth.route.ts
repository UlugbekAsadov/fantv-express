import { Router } from 'express';
import { Register } from '../../controllers/auth/register';
import { Login } from '../../controllers/auth/login';
import { ChangePassword } from '../../controllers/auth/change-password';
import { CheckTelegramOtp } from '../../controllers/auth/telegram-auth/check-telegram-otp';
import { SetTelegramPassword } from '../../controllers/auth/telegram-auth/set-telegram-password';
import { CheckTelegramPassword } from '../../controllers/auth/telegram-auth/check-telegram-password';
import { asyncWrapper } from '../../utils/helper/async-wrapper';
import { ProtectedMiddlewares } from '../../middlewares/protected.middleware';

class AuthRoutes {
  private router: Router;
  private middlewares: ProtectedMiddlewares;

  constructor() {
    this.router = Router();
    this.middlewares = new ProtectedMiddlewares();
  }

  public unprotectedRoutes = (): Router => {
    this.router.post('/auth/register', asyncWrapper(Register.prototype.create));
    this.router.post('/auth/login', asyncWrapper(Login.prototype.read));
    this.router.post('/auth/telegram-check-otp', asyncWrapper(CheckTelegramOtp.prototype.read));

    return this.router;
  };

  public protectedRoutes = (): Router => {
    this.router.post('/auth/change-password', this.middlewares.verifyAuth, asyncWrapper(ChangePassword.prototype.update));
    this.router.post('/auth/telegram-set-password', this.middlewares.verifyAuth, asyncWrapper(SetTelegramPassword.prototype.update));
    this.router.post('/auth/telegram-check-password', this.middlewares.verifyAuth, asyncWrapper(CheckTelegramPassword.prototype.read));

    return this.router;
  };
}

const authRoutes = new AuthRoutes();

export { authRoutes };
