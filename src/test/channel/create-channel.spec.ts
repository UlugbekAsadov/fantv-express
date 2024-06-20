import { Create } from '../../controllers/channel/create-channel';
import { channelService } from '../../services/channel/channel.service';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { IChannelDocument } from '../../utils/interfaces/channel.interface';
import { Request } from '../../utils/interfaces/express.interface';
import { channelMockRequest, channelMockResponse, mockChannelBody } from '../../utils/mock/channel.mock';
import { connect, clearDatabase, closeDatabase } from '../setup';
import HTTP_STATUS from 'http-status-codes';

describe('create channel', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should throw error if channel exist', async () => {
    const request = channelMockRequest(mockChannelBody, '123') as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelByUsername').mockResolvedValue({} as IChannelDocument);

    await Create.prototype.channel(request, response).catch((error) => {
      console.log({ error });
      expect(channelService.getChannelByUsername).toHaveBeenCalledWith(request.body.channelUsername);

      expect(error.message).toBe(ErrorMessages.CHANNEL_ALREADY_EXISTS);
      expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    });
  });
});
