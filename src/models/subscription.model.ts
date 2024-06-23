import mongoose, { Schema } from 'mongoose';
import { ISubscriptionDocument } from '../utils/interfaces/subscription.interface';

export const subscriptionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: Date },
});

subscriptionSchema.pre('save', function (next) {
  if (this.isNew) {
    const endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + 30);
    this.endDate = endDate;
  }
  next();
});

export const SubscriptionModel = mongoose.model<ISubscriptionDocument>('Subscription', subscriptionSchema);
