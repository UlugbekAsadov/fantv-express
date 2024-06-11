import { Router } from 'express';
import {
  validateChangePassword,
  validateLogin,
  validateRegister,
} from '../validator/user.validator';
import { validateRequest } from '../middlewares/validate.middleware';
import { authController } from '../controllers/auth.controller';
import { AuthMiddlewares } from '../middlewares/protected-route.middleware';

class AuthRoutes {
  private router: Router;
  private authMiddlewares: AuthMiddlewares;

  constructor() {
    this.router = Router();
    this.authMiddlewares = new AuthMiddlewares();
  }

  public unprotectedRoutes = (): Router => {
    this.router.post(
      '/auth/register',
      validateRegister(),
      validateRequest,
      authController.register,
    );
    this.router.post(
      '/auth/login',
      validateLogin(),
      validateRequest,
      authController.login,
    );
    this.router.post(
      '/auth/telegram-check-otp',
      authController.telegramCheckOtp,
    );

    return this.router;
  };

  public protectedRoutes = (): Router => {
    this.router.post(
      '/auth/change-password',
      validateChangePassword(),
      validateRequest,
      authController.changePassword,
    );
    this.router.post(
      '/auth/telegram-set-password',
      validateChangePassword(),
      validateRequest,
      authController.telegramSetPassword,
    );
    this.router.post(
      '/auth/telegram-check-password',
      validateChangePassword()[0],
      validateRequest,
      authController.telegramCheckPassword,
    );

    return this.router;
  };
}

const authRoutes = new AuthRoutes();

export { authRoutes };
