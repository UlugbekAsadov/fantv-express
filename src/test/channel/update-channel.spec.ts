import { Update } from '../../controllers/channel/update-channels';
import { channelService } from '../../services/channel/channel.service';
import { ChannelStatus } from '../../utils/enums/channel.enum';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { SuccessMessages } from '../../utils/enums/success-response.enum';
import { CustomError } from '../../utils/helper/error-handler';
import { IChannelDocument } from '../../utils/interfaces/channel.interface';
import { Request } from '../../utils/interfaces/express.interface';
import {
  MOCK_USER_B_ID,
  MOCK_CHANNEL_ID,
  MOCK_USER_ID,
  channelMockRequest,
  channelMockResponse,
  mockChannelBody,
  MOCK_CHANNEL_B_ID,
} from '../../utils/mock/channel.mock';
import { connect, clearDatabase, closeDatabase } from '../setup';
import HTTP_STATUS from 'http-status-codes';

describe('Update channel', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("should throw an error if channel doesn't exist", async () => {
    const params = {
      id: MOCK_CHANNEL_ID,
    };
    const request = channelMockRequest(mockChannelBody, MOCK_USER_ID, params) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue(null as any);

    Update.prototype.channel(request, response).catch((error: CustomError) => {
      expect(channelService.getChannelById).toHaveBeenCalledWith(request.params.id);
      expect(error.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(error.message).toBe(ErrorMessages.CHANNEL_NOT_FOUND);
    });
  });

  it('should throw an error if channel has deleted', async () => {
    const params = {
      id: MOCK_CHANNEL_ID,
    };
    const request = channelMockRequest(mockChannelBody, MOCK_USER_ID, params) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue({ status: ChannelStatus.Deleted } as IChannelDocument);

    Update.prototype.channel(request, response).catch((error: CustomError) => {
      expect(channelService.getChannelById).toHaveBeenCalledWith(request.params.id);
      expect(error.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(error.message).toBe(ErrorMessages.CHANNEL_NOT_FOUND);
    });
  });

  it('should throw an error if user is not owner of updating channel', async () => {
    const params = {
      id: MOCK_CHANNEL_ID,
    };
    const request = channelMockRequest(mockChannelBody, MOCK_USER_ID, params) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue({ authorId: MOCK_USER_B_ID } as IChannelDocument);

    Update.prototype.channel(request, response).catch((error: CustomError) => {
      expect(channelService.getChannelById).toHaveBeenCalledWith(request.params.id);
      expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(error.message).toBe(ErrorMessages.NOT_ALLOWED);
    });
  });

  it('should throw an error if new channelUsername exists', async () => {
    const params = {
      id: MOCK_CHANNEL_ID,
    };
    const request = channelMockRequest(mockChannelBody, MOCK_USER_ID, params) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue({ authorId: MOCK_USER_ID } as IChannelDocument);
    jest.spyOn(channelService, 'getChannelByUsername').mockResolvedValue({ _id: MOCK_CHANNEL_B_ID } as IChannelDocument);

    Update.prototype.channel(request, response).catch((error: CustomError) => {
      expect(channelService.getChannelById).toHaveBeenCalledWith(request.params.id);
      expect(channelService.getChannelByUsername).toHaveBeenCalledWith(request.body.channelUsername);
      expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(error.message).toBe(ErrorMessages.USERNAME_ALREADY_EXISTS);
    });
  });

  it('should update user', async () => {
    const params = {
      id: MOCK_CHANNEL_ID,
    };
    const request = channelMockRequest(mockChannelBody, MOCK_USER_ID, params) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue({ authorId: MOCK_USER_ID } as IChannelDocument);
    jest.spyOn(channelService, 'getChannelByUsername').mockResolvedValue({ _id: MOCK_CHANNEL_ID } as IChannelDocument);
    jest.spyOn(channelService, 'getByIdAndUpdateChannel').mockResolvedValue({} as IChannelDocument);

    await Update.prototype.channel(request, response);

    expect(channelService.getChannelById).toHaveBeenCalledWith(request.params.id);
    expect(channelService.getChannelByUsername).toHaveBeenCalledWith(request.body.channelUsername);

    expect(response.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(response.json).toHaveBeenCalledWith({ message: SuccessMessages.CHANNEL_UPDATED });
  });
});
