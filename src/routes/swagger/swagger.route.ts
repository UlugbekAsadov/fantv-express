import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../configs/swagger.config';

class SwaggerRoutes {
  private readonly router: Router;

  constructor() {
    this.router = this.router = Router();
  }

  public routes = (): Router => {
    this.router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    return this.router;
  };
}

const swaggerRoutes = new SwaggerRoutes();

export { swaggerRoutes };
