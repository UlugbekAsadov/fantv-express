import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { ChannelStatus } from '../enums/channel.enum';
import { IChannelMock } from '../interfaces/channel.interface';

export const channelMockRequest = (body: IChannelMock, userId?: string, params?: { id?: string }) => ({ body, userId, params });

export const channelMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockChannelBody: IChannelMock = {
  channelBanner: 'banner',
  channelCurrency: 'UZS',
  channelDescription: 'description',
  channelLogo: 'logo',
  channelName: 'mock channel name',
  channelPrice: 100000,
  channelUsername: 'username',
  status: ChannelStatus.Active,
};

export const MOCK_USER_ID = '123456789';
export const MOCK_USER_B_ID = 'asldkasljdasd';
export const MOCK_CHANNEL_ID = '987654321';
export const MOCK_CHANNEL_B_ID = new ObjectId();
export const MOCK_AUTHOR_ID = '123456789';
