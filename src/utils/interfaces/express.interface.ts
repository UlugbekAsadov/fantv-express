import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  userId?: string;
  phoneNumber?: string;
  authId?: string;
}

export interface Error {
  status?: number;
  message?: string;
}
