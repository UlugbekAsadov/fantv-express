import { Router } from 'express';
import { UserController } from '../controllers/auth.controller';
import { protectedRoute } from '../middlewares/protectedRoute';
import {
  validateChangePassword,
  validateLogin,
  validateRegister,
} from '../validator/user.validator';
import { validateRequest } from '../middlewares/validate.middleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
  '/register',
  validateRegister(),
  validateRequest,
  userController.register,
);
userRoutes.post(
  '/login',
  validateLogin(),
  validateRequest,
  userController.login,
);
userRoutes.post(
  '/update-password',
  protectedRoute,
  validateChangePassword(),
  validateRequest,
  userController.updatePassword,
);

userRoutes.post('/telegram-check-otp', userController.telegramCheckOtp);
userRoutes.post(
  '/telegram-set-password',
  protectedRoute,
  validateChangePassword(),
  validateRequest,
  userController.telegramSetPassword,
);
userRoutes.post(
  '/telegram-check-password',
  protectedRoute,
  validateChangePassword()[0],
  validateRequest,
  userController.telegramCheckPassword,
);

export { userRoutes };
