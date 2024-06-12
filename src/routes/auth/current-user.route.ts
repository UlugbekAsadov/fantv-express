import { Router } from 'express';
import { AuthMiddlewares } from '../../middlewares/protected-route.middleware';
import { CurrentUser } from '../../controllers/auth/current-user';

class UserRoutes {
  private router: Router;
  private authMiddlewares: AuthMiddlewares;

  constructor() {
    this.router = Router();
    this.authMiddlewares = new AuthMiddlewares();
  }

  public routes() {
    this.router.get('/me', this.authMiddlewares.verifyUser, CurrentUser.prototype.read);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
