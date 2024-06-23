import { ChannelModel } from '../../models/channel.model';
import { ChannelStatus } from '../../utils/enums/channel.enum';
import { IChannelDocument } from '../../utils/interfaces/channel.interface';

class ChannelService {
  public getChannelByUsername = async (channelUsername: string): Promise<IChannelDocument> => {
    const channel: IChannelDocument = (await ChannelModel.findOne({ channelUsername })) as IChannelDocument;
    return channel;
  };

  public createChannel = async (channel: IChannelDocument): Promise<IChannelDocument> => {
    const newChannel: IChannelDocument = (await ChannelModel.create(channel)) as IChannelDocument;
    return newChannel;
  };

  public getChannelById = async (channelId: string): Promise<IChannelDocument> => {
    const channel: IChannelDocument = (await ChannelModel.findById(channelId)) as IChannelDocument;
    return channel;
  };
  public getSortedActiveChannels = async (): Promise<IChannelDocument[]> => {
    const channels: IChannelDocument[] = (await ChannelModel.find({ status: ChannelStatus.Active }).sort({
      followers: -1,
    })) as IChannelDocument[];
    return channels;
  };

  public getMyChannels = async (userId: string) => {
    const channels: IChannelDocument[] = (await ChannelModel.find({ userId })) as IChannelDocument[];
    return channels;
  };

  public getByIdAndUpdateChannel = async (channelId: string, channel: IChannelDocument): Promise<IChannelDocument> => {
    const updatedChannel: IChannelDocument = (await ChannelModel.findByIdAndUpdate(channelId, channel)) as IChannelDocument;
    return updatedChannel;
  };
}

export const channelService = new ChannelService();
