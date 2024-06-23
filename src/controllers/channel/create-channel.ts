import { Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { IChannelDocument } from '../../utils/interfaces/channel.interface';
import { channelService } from '../../services/channel/channel.service';
import { BadRequestError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '../../utils/decorators/joi-decorator';
import { createChannelSchema } from '../../schemas/channel/channel-create.schema';

export class Create {
  @joiValidation(createChannelSchema)
  public async channel(req: Request, res: Response): Promise<void> {
    const { channelName, channelUsername, channelPrice, channelCurrency, status, channelDescription, channelLogo, channelBanner } =
      req.body as IChannelDocument;
    const userId = req.userId;

    if (!userId) throw new BadRequestError(ErrorMessages.ACCESS_DENIED);

    const existingChannel = await channelService.getChannelByUsername(channelUsername);

    if (existingChannel) throw new BadRequestError(ErrorMessages.CHANNEL_ALREADY_EXISTS);

    const channelBody: IChannelDocument = {
      channelName,
      channelUsername,
      channelPrice,
      channelCurrency,
      authorId: userId,
      status,
      channelDescription,
      channelLogo,
      channelBanner,
    } as unknown as IChannelDocument;

    const channel = await channelService.createChannel(channelBody);

    res.status(HTTP_STATUS.CREATED).json(channel);
  }
}
