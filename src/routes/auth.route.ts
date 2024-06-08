import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { protectedRoute } from '../middlewares/protected-route.middleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.post(
  '/forgot-password',
  protectedRoute,
  userController.updatePassword,
);

export { userRoutes };
