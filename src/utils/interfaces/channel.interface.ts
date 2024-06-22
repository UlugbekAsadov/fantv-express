import { Document } from 'mongoose';
import { TChannelCurrency } from '../types/channel.type';
import { ChannelStatus } from '../enums/channel.enum';

export interface IChannelDocument extends Document {
  authorId: string;
  channelName: string;
  channelUsername: string;
  channelDescription?: string;
  channelLogo?: string;
  channelBanner?: string;
  channelPrice: number;
  channelCurrency: TChannelCurrency;
  status: ChannelStatus;
  followers: number;
}

export interface IChannelMock {
  _id?: string;
  authorId?: string;
  channelName?: string;
  channelUsername?: string;
  channelDescription?: string;
  channelLogo?: string;
  channelBanner?: string;
  channelPrice?: number;
  channelCurrency?: TChannelCurrency;
  status?: ChannelStatus;
}
