import { Application } from 'express';
import { config } from './configs';
import { authRoutes } from './routes/auth/auth.route';
import { userRoutes } from './routes/auth/current-user.route';
import { channelRoutes } from './routes/channel/channel.route';

export default (app: Application) => {
  const routes = () => {
    app.use(config.BASE_PATH, authRoutes.unprotectedRoutes());
    app.use(config.BASE_PATH, authRoutes.protectedRoutes());

    app.use(config.BASE_PATH, userRoutes.routes());
    app.use(config.BASE_PATH, channelRoutes.routes());
  };

  routes();
};
