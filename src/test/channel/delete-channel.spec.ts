import { Delete } from '../../controllers/channel/delete-channel';
import { channelService } from '../../services/channel/channel.service';
import { ChannelStatus } from '../../utils/enums/channel.enum';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { SuccessMessages } from '../../utils/enums/success-response.enum';
import { CustomError } from '../../utils/helper/error-handler';
import { IChannelDocument } from '../../utils/interfaces/channel.interface';
import { Request } from '../../utils/interfaces/express.interface';
import { channelMockRequest, channelMockResponse, mockChannelBody } from '../../utils/mock/channel.mock';
import { connect, clearDatabase, closeDatabase } from '../setup';
import HTTP_STATUS from 'http-status-codes';

describe('delete channel', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should throw error if channel not found', async () => {
    const request = channelMockRequest(mockChannelBody, '123', { id: '123' }) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue(null as any);

    await Delete.prototype.channel(request, response).catch((error) => {
      expect(channelService.getChannelById).toHaveBeenCalledWith(request.params.id);

      expect(error.message).toBe(ErrorMessages.CHANNEL_NOT_FOUND);
      expect(error.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    });
  });

  it('should throw error if user is not owner of deleting channel', async () => {
    const request = channelMockRequest(mockChannelBody, '123', { id: '123' }) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue({ authorId: '312' } as IChannelDocument);

    await Delete.prototype.channel(request, response).catch((error: CustomError) => {
      expect(channelService.getChannelById).toHaveBeenCalledTimes(1);
      expect(channelService.getChannelById).toHaveBeenCalledWith(request.params.id);

      expect(error.message).toBe(ErrorMessages.ACCESS_DENIED);
      expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    });
  });

  it('should delete channel', async () => {
    const request = channelMockRequest(mockChannelBody, '123', { id: '123' }) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue({ authorId: '123' } as IChannelDocument);
    jest.spyOn(channelService, 'getByIdAndUpdateChannel').mockResolvedValue({ status: ChannelStatus.Deleted } as IChannelDocument);

    await Delete.prototype.channel(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(response.json).toHaveBeenCalledWith({ message: SuccessMessages.CHANNEL_DELETED });
  });
});
