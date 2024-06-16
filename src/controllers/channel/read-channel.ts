import { Response } from 'express';
import { Request } from '../../utils/interfaces/express.interface';
import { channelService } from '../../services/channel/channel.service';
import { BadRequestError, NotFoundError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import HTTP_STATUS from 'http-status-codes';
import { ChannelStatus } from '../../utils/enums/channel.enum';

export class Read {
  public async channelById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const userId = req.userId as string;

    const channel = await channelService.getChannelById(id);

    if (!channel) throw new NotFoundError(ErrorMessages.CHANNEL_NOT_FOUND);

    const channelOwnerId = channel.authorId.toString();

    const isOwner = channelOwnerId === userId;

    const isChannelActive = channel.status === ChannelStatus.Active;

    if (!isChannelActive && !isOwner) throw new NotFoundError(ErrorMessages.CHANNEL_NOT_FOUND);

    res.status(HTTP_STATUS.OK).json(channel);
  }

  public async channels(req: Request, res: Response) {
    const channels = await channelService.getActiveChannels();
    res.status(HTTP_STATUS.OK).json(channels);
  }

  // public async myChannels(req: Request, res: Response) {
  //   const userId = req.userId as string;

  //   const page = parseInt(req.query.page as string, 10) || 1;
  //   const limit = parseInt(req.query.limit as string, 10) || 10;

  //   const paginator = new Paginator(ChannelModel, { page, limit }, { userId });
  //   const paginatedUsers = await paginator.paginate();

  //   return res.status(HTTP_STATUS.OK).json(paginatedUsers);
  // }
}
