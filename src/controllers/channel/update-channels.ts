import { Response } from 'express';
import { channelService } from '../../services/channel/channel.service';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { BadRequestError, NotFoundError } from '../../utils/helper/error-handler';
import { IChannelDocument } from '../../utils/interfaces/channel.interface';
import { Request } from '../../utils/interfaces/express.interface';
import HTTP_STATUS from 'http-status-codes';
import { SuccessMessages } from '../../utils/enums/success-response.enum';
import { ChannelStatus } from '../../utils/enums/channel.enum';
import { joiValidation } from '../../utils/decorators/joi-decorator';
import { updateChannelSchema } from '../../schemas/channel/channel-update.schema';
import { ObjectId } from 'mongodb';

export class Update {
  @joiValidation(updateChannelSchema)
  public async channel(req: Request, res: Response): Promise<void> {
    const { channelName, channelUsername, channelDescription, channelLogo, channelBanner, channelPrice, channelCurrency, status } =
      req.body as IChannelDocument;
    const channelId = req.params.id;
    const userId = req.userId as ObjectId;

    const channel = await channelService.getChannelById(channelId);
    const isChannelDeleted = channel?.status === ChannelStatus.Deleted;

    if (!channel || isChannelDeleted) throw new NotFoundError(ErrorMessages.CHANNEL_NOT_FOUND);

    const isChannelOwner = channel.authorId.toString() === userId.toString();

    if (!isChannelOwner) throw new BadRequestError(ErrorMessages.NOT_ALLOWED);

    const newUsernameChannel = await channelService.getChannelByUsername(channelUsername);

    if (newUsernameChannel && newUsernameChannel._id?.toString() !== channelId)
      throw new BadRequestError(ErrorMessages.USERNAME_ALREADY_EXISTS);

    const channelBody: IChannelDocument = {
      channelName: channelName || channel.channelName,
      channelUsername: channelUsername || channel.channelUsername,
      channelDescription: channelDescription || channel.channelDescription,
      channelLogo: channelLogo || channel.channelLogo,
      channelBanner: channelBanner || channel.channelBanner,
      channelPrice: channelPrice || channel.channelPrice,
      channelCurrency: channelCurrency || channel.channelCurrency,
      status: status || channel.status,
    } as IChannelDocument;

    await channelService.getByIdAndUpdateChannel(channelId, channelBody);

    res.status(HTTP_STATUS.OK).json({ message: SuccessMessages.CHANNEL_UPDATED });
  }
}
