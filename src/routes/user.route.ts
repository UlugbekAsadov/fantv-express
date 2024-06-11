import { Router } from 'express';
import { userController } from '../controllers/user.controller';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public routes() {
    this.router.get('/me', userController.getMe);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
