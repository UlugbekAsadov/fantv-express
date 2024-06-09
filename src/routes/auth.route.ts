import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { protectedRoute } from '../middlewares/protected-route.middleware';
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

export { userRoutes };
