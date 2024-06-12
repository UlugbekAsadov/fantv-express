import { Router } from 'express';
import { validateLogin, validateRegister } from '../../validator/user.validator';
import { validateRequest } from '../../middlewares/validate.middleware';
import { AuthMiddlewares } from '../../middlewares/protected-route.middleware';
import { Register } from '../../controllers/auth/register';
import { Login } from '../../controllers/auth/login';
import { ChangePassword } from '../../controllers/auth/change-password';
import { CheckTelegramOtp } from '../../controllers/auth/telegram-auth/check-telegram-otp';
import { SetTelegramPassword } from '../../controllers/auth/telegram-auth/set-telegram-password';
import { CheckTelegramPassword } from '../../controllers/auth/telegram-auth/check-telegram-password';

class AuthRoutes {
  private router: Router;
  private authMiddlewares: AuthMiddlewares;

  constructor() {
    this.router = Router();
    this.authMiddlewares = new AuthMiddlewares();
  }

  public unprotectedRoutes = (): Router => {
    this.router.post('/auth/register', validateRegister(), validateRequest, Register.prototype.create);
    this.router.post('/auth/login', validateLogin(), validateRequest, Login.prototype.read);
    this.router.post('/auth/telegram-check-otp', CheckTelegramOtp.prototype.read);

    return this.router;
  };

  public protectedRoutes = (): Router => {
    this.router.post('/auth/change-password', this.authMiddlewares.verifyUser, ChangePassword.prototype.update);
    this.router.post('/auth/telegram-set-password', this.authMiddlewares.verifyUser, SetTelegramPassword.prototype.update);
    this.router.post('/auth/telegram-check-password', this.authMiddlewares.verifyUser, CheckTelegramPassword.prototype.read);

    return this.router;
  };
}

const authRoutes = new AuthRoutes();

export { authRoutes };
