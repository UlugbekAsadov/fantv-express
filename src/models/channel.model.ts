import { Model, Schema, model } from 'mongoose';
import { IChannelDocument } from '../utils/interfaces/channel.interface';
import { ChannelStatus } from '../utils/enums/channel.enum';

const channelService: Schema = new Schema(
  {
    channelName: { type: String, required: true },
    channelUsername: { type: String, required: true, unique: true },
    channelDescription: { type: String },
    channelLogo: { type: String },
    channelBanner: { type: String },
    channelPrice: { type: Number, required: true },
    channelCurrency: { type: String, default: 'UZS' },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: ChannelStatus.Inactive },
    followers: { type: Number, default: 0 },
    lastVideos: { type: Array, default: [] },
  },
  { timestamps: true },
);

export const ChannelModel: Model<IChannelDocument> = model<IChannelDocument>('Channel', channelService);
