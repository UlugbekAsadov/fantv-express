import { Application } from 'express';
import { config } from './configs';
import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';
import { authMiddlewares } from './middlewares/protected-route.middleware';

export const applicationRoutes = (app: Application) => {
  app.use(config.BASE_PATH, authRoutes.unprotectedRoutes());
  
  app.use(config.BASE_PATH, authMiddlewares.verifyUser, authRoutes.protectedRoutes());
  app.use(config.BASE_PATH, authMiddlewares.verifyUser, userRoutes.routes());
};
