import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { TChannelCurrency } from '../types/channel.type';
import { ChannelStatus } from '../enums/channel.enum';

export interface IChannelDocument extends Document {
  _id: ObjectId;
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
  lastVideos: [];
  isSubscribed?: boolean;
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
