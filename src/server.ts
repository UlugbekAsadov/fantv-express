import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import { config } from './configs';
import Logger from 'bunyan';
import cors from 'cors';
import helment from 'helmet';
import applicationRoutes from './routes';
import { IErrorResponse } from './utils/interfaces/error.interface';
import { CustomError } from './utils/helper/error-handler';
import HTTPS_STATUS from 'http-status-codes';

const log: Logger = config.createLogger('server');

export class FanTvServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.securityMiddlewares(this.app);
    this.standardMiddleware(this.app);
    this.routedMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddlewares(app: Application): void {
    app.use(helment());
    app.use(cors());
  }

  private standardMiddleware(app: Application): void {
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: false, limit: '50mb' }));
  }

  private routedMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTPS_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }

      next();
    });
  }

  private startServer(app: Application): void {
    try {
      app.listen(config.PORT, () => {
        log.info(`Server is running on port ${config.PORT}`);
      });
    } catch (error) {
      log.error(error);
    }
  }
}
