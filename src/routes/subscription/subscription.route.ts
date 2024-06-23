import { Router } from 'express';
import { ProtectedMiddlewares } from '../../middlewares/protected.middleware';
import { asyncWrapper } from '../../utils/helper/async-wrapper';
import { Create } from '../../controllers/subscription/create-subscription';

class SubscriptionRoutes {
  private readonly router: Router;
  private middlewares: ProtectedMiddlewares;

  constructor() {
    this.middlewares = new ProtectedMiddlewares();
    this.router = this.router = Router();
  }

  public routes = (): Router => {
    this.router.post('/subcription/:channelId', this.middlewares.verifyAuth, asyncWrapper(Create.prototype.subscription));

    return this.router;
  };
}

const subscriptionRoutes = new SubscriptionRoutes();

export { subscriptionRoutes };
