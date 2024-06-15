import { Response, NextFunction } from 'express';
import { Request } from '../interfaces/express.interface';

export const asyncWrapper =
  (fn: (req: Request, res: Response) => Promise<void | boolean>) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };
