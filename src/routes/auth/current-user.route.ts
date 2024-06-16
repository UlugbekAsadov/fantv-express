import { Router } from 'express';
import { CurrentUser } from '../../controllers/auth/current-user';
import { ProtectedMiddlewares } from '../../middlewares/protected.middleware';

class UserRoutes {
  private router: Router;
  private middlewares: ProtectedMiddlewares;

  constructor() {
    this.router = Router();
    this.middlewares = new ProtectedMiddlewares();
  }

  public routes() {
    this.router.get('/me', this.middlewares.verifyAuth, CurrentUser.prototype.read);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
