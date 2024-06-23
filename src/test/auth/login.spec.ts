import { Login } from '../../controllers/auth/login';
import { authMock, mergedAuthAndUserMock, mockAuthRequest, mockAuthResponse } from '../../utils/mock/auth.mock';
import { CustomError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import { clearDatabase, closeDatabase, connect } from '../setup';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '../../services/auth/auth.service';
import { Request } from '../../utils/interfaces/express.interface';
import { userService } from '../../services/user/user.service';

const PHONE_NUMBER = '+998919537097';
const PASSWORD = 'asdqwe123';

describe('Login', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should throw error if phonenumber is not exist', async () => {
    const mockRequest = mockAuthRequest({ phoneNumber: PHONE_NUMBER, password: PASSWORD }) as Request;

    jest.spyOn(authService, 'getAuthByPhoneNumber').mockResolvedValueOnce(null as any);

    await Login.prototype.read(mockRequest, mockAuthResponse()).catch((error) => {
      expect(authService.getAuthByPhoneNumber).toHaveBeenCalledWith(mockRequest.body.phoneNumber);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(error.message).toBe(ErrorMessages.AUTH_NOT_FOUND);
    });
  });

  it("should throw error if password doesn't match", async () => {
    const req = mockAuthRequest({ phoneNumber: PHONE_NUMBER, password: PASSWORD }) as Request;
    const res = mockAuthResponse();
    authMock.comparePassword = () => Promise.resolve(false);

    jest.spyOn(authService, 'getAuthByPhoneNumber').mockResolvedValueOnce(authMock);

    await Login.prototype.read(req, res).catch((error) => {
      expect(authService.getAuthByPhoneNumber).toHaveBeenCalledWith(PHONE_NUMBER);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(error.message).toBe(ErrorMessages.INVALID_PASSWORD);
    });
  });

  it('should set session data for valid credentials and send correct json response', async () => {
    const req = mockAuthRequest({ phoneNumber: PHONE_NUMBER, password: PASSWORD }) as Request;
    const res = mockAuthResponse();
    authMock.comparePassword = () => Promise.resolve(true);

    jest.spyOn(authService, 'getAuthByPhoneNumber').mockResolvedValueOnce(authMock);
    jest.spyOn(userService, 'getUserByAuthId').mockResolvedValueOnce(mergedAuthAndUserMock);

    await Login.prototype.read(req, res);

    expect(authService.getAuthByPhoneNumber).toHaveBeenCalledWith(PHONE_NUMBER);
    expect(userService.getUserByAuthId).toHaveBeenCalledWith(authMock._id);
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: expect.any(Object),
    });
  });
});
