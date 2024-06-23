import { SubscriptionModel } from '../../models/subscription.model';
import { ISubscriptionDocument } from '../../utils/interfaces/subscription.interface';
import { ObjectId } from 'mongodb';

class SubscriptionService {
  public async getSubscription(channelId: string, userId: ObjectId): Promise<ISubscriptionDocument> {
    const subscription = (await SubscriptionModel.findOne({ channelId, userId })) as ISubscriptionDocument;
    return subscription;
  }

  public async getSubscriptionsByUserId(userId: ObjectId): Promise<ISubscriptionDocument[]> {
    const subscriptions = (await SubscriptionModel.find({ userId })) as ISubscriptionDocument[];
    return subscriptions;
  }

  public async createSubscription(body: ISubscriptionDocument): Promise<ISubscriptionDocument> {
    const subscription = new SubscriptionModel(body);
    await subscription.save();
    return subscription;
  }
}

export const subscriptionService = new SubscriptionService();
