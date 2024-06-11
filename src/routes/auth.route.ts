import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { protectedRoute } from '../middlewares/protectedRoute';
import {
  validateChangePassword,
  validateLogin,
  validateRegister,
} from '../validator/user.validator';
import { validateRequest } from '../middlewares/validate.middleware';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  '/register',
  validateRegister(),
  validateRequest,
  authController.register,
);
authRoutes.post(
  '/login',
  validateLogin(),
  validateRequest,
  authController.login,
);
authRoutes.post(
  '/change-password',
  protectedRoute,
  validateChangePassword(),
  validateRequest,
  authController.changePassword,
);

authRoutes.post('/telegram-check-otp', authController.telegramCheckOtp);
authRoutes.post(
  '/telegram-set-password',
  protectedRoute,
  validateChangePassword(),
  validateRequest,
  authController.telegramSetPassword,
);
authRoutes.post(
  '/telegram-check-password',
  protectedRoute,
  validateChangePassword()[0],
  validateRequest,
  authController.telegramCheckPassword,
);

export { authRoutes };
