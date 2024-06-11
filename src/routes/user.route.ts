import { Router } from 'express';
import { protectedRoute } from '../middlewares/protectedRoute';
import { UserController } from '../controllers/user.controller';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/me', protectedRoute, userController.getMe);

export { userRoutes };
