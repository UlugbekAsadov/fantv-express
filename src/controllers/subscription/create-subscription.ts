import { Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { channelService } from '../../services/channel/channel.service';
import { ChannelStatus } from '../../utils/enums/channel.enum';
import { BadRequestError, NotFoundError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { userService } from '../../services/user/user.service';
import { subscriptionService } from '../../services/subscription/subscription.service';
import { ISubscriptionDocument } from '../../utils/interfaces/subscription.interface';
import { ObjectId } from 'mongodb';

export class Create {
  public async subscription(req: Request, res: Response) {
    const channelId = req.params.channelId;
    const userId = req.userId as unknown as ObjectId;

    const existingChannel = await channelService.getChannelById(channelId);

    if (!existingChannel || existingChannel.status !== ChannelStatus.Active) throw new NotFoundError(ErrorMessages.CHANNEL_NOT_FOUND);

    const existingUser = await userService.getUserByAuthId(userId);

    if (!existingUser || !existingUser.isActive) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);

    const existingSubscription = await subscriptionService.getSubscription(channelId, userId);

    const hasExpiredSubscription = existingSubscription?.endDate < new Date();

    if (existingSubscription && !hasExpiredSubscription) throw new BadRequestError(ErrorMessages.ALREADY_SUBSCRIBED);

    const hasUserEnoughMoney = existingUser.balance >= existingChannel.channelPrice;

    if (!hasUserEnoughMoney) throw new BadRequestError(ErrorMessages.NO_ENOUGH_MONEY);

    const newBalance = existingUser.balance - existingChannel.channelPrice;

    await userService.findByIdAndUpdateBalance(userId, newBalance);

    const newSubscriptionBody: ISubscriptionDocument = {
      channelId: existingChannel._id,
      userId: existingUser._id,
      price: existingChannel.channelPrice,
    } as ISubscriptionDocument;

    const subscription = await subscriptionService.createSubscription(newSubscriptionBody);

    res.status(201).json(subscription);
  }
}
