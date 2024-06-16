import { Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { channelService } from '../../services/channel/channel.service';
import { ChannelStatus } from '../../utils/enums/channel.enum';
import { BadRequestError, NotFoundError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { IChannelDocument } from '../../utils/interfaces/channel.interface';
import { SuccessMessages } from '../../utils/enums/success-response.enum';
import HTTP_STATUS from 'http-status-codes';

export class Delete {
  public async channel(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId as string;

    const existingChannel = await channelService.getChannelById(id);

    if (!existingChannel) throw new NotFoundError(ErrorMessages.CHANNEL_NOT_FOUND);

    if (existingChannel.authorId.toString() !== userId) throw new BadRequestError(ErrorMessages.ACCESS_DENIED);

    const channelBody: IChannelDocument = { ...existingChannel, status: ChannelStatus.Deleted } as IChannelDocument;

    await channelService.getByIdAndUpdateChannel(id, channelBody);

    res.status(HTTP_STATUS.OK).json({ message: SuccessMessages.CHANNEL_DELETED });
  }
}
