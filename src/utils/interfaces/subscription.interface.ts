import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ISubscriptionDocument extends Document {
  userId: ObjectId;
  channelId: ObjectId;
  price: number;
  startDate: Date;
  endDate: Date;
}
