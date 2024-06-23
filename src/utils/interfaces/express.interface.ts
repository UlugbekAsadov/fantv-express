import { Request as ExpressRequest } from 'express';
import { ObjectId } from 'mongodb';

export interface Request extends ExpressRequest {
  userId?: ObjectId;
  authId?: ObjectId;
}

export interface Error {
  status?: number;
  message?: string;
}
