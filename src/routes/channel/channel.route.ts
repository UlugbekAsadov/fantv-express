import { Router } from 'express';
import { Create } from '../../controllers/channel/create-channel';
import { asyncWrapper } from '../../utils/helper/async-wrapper';
import { Read } from '../../controllers/channel/read-channel';
import { ProtectedMiddlewares } from '../../middlewares/protected.middleware';
import { Update } from '../../controllers/channel/update-channels';
import { Delete } from '../../controllers/channel/delete-channel';

class ChannelRoutes {
  private readonly router: Router;
  private middlewares: ProtectedMiddlewares;

  constructor() {
    this.middlewares = new ProtectedMiddlewares();
    this.router = this.router = Router();
  }

  public routes = (): Router => {
    this.router.post(
      '/channel/create',
      this.middlewares.verifyAuth,
      this.middlewares.verifyAuthorRole,
      asyncWrapper(Create.prototype.channel),
    );

    this.router.patch('/channel/:id', this.middlewares.verifyAuth, asyncWrapper(Update.prototype.channel));
    this.router.get('/channel/:id', this.middlewares.verifyAuth, asyncWrapper(Read.prototype.channelById));
    this.router.get('/channels', asyncWrapper(Read.prototype.channels));
    this.router.delete(
      '/channel/:id',
      this.middlewares.verifyAuth,
      this.middlewares.verifyAuthorRole,
      asyncWrapper(Delete.prototype.channel),
    );

    return this.router;
  };
}

const channelRoutes = new ChannelRoutes();

export { channelRoutes };
