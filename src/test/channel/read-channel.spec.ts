import { Read } from '../../controllers/channel/read-channel';
import { channelService } from '../../services/channel/channel.service';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { CustomError } from '../../utils/helper/error-handler';
import { Request } from '../../utils/interfaces/express.interface';
import { MOCK_CHANNEL_ID, MOCK_USER_ID, channelMockRequest, channelMockResponse } from '../../utils/mock/channel.mock';
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

    const request = channelMockRequest({}, MOCK_USER_ID, params) as Request;
    const response = channelMockResponse();

    jest.spyOn(channelService, 'getChannelById').mockResolvedValue(null as any);

    Read.prototype.channelById(request, response).catch((error: CustomError) => {
      expect(error.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(error.message).toBe(ErrorMessages.CHANNEL_NOT_FOUND);
    });
  });
});
