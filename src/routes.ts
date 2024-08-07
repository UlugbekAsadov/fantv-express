import { Application } from 'express';
import { config } from './configs';
import { authRoutes } from './routes/auth/auth.route';
import { userRoutes } from './routes/auth/current-user.route';
import { channelRoutes } from './routes/channel/channel.route';
import { swaggerRoutes } from './routes/swagger/swagger.route';
import { subscriptionRoutes } from './routes/subscription/subscription.route';

export default (app: Application) => {
  const routes = () => {
    app.use(config.BASE_PATH, swaggerRoutes.routes());

    app.use(config.BASE_PATH, authRoutes.unprotectedRoutes());
    app.use(config.BASE_PATH, authRoutes.protectedRoutes());

    app.use(config.BASE_PATH, userRoutes.routes());
    app.use(config.BASE_PATH, channelRoutes.routes());
    app.use(config.BASE_PATH, subscriptionRoutes.routes());
  };

  routes();
};
