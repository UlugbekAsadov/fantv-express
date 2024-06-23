import { ObjectId } from 'mongodb';

export interface JwtPayload {
  userId: ObjectId;
  authId: ObjectId;
}
