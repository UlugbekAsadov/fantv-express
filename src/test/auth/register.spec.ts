import { Register } from '../../controllers/auth/register';
import { Request } from '../../utils/interfaces/express.interface';
import { mockAuthRequest, mockAuthResponse, mockRegistrationBody } from '../../utils/mock/auth.mock';
import { clearDatabase, closeDatabase, connect } from '../setup';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import HTTP_STATUS from 'http-status-codes';
import { telegramAuthService } from '../../services/auth/telegram-auth.service';

describe('Register', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should throw error if username is empty', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody, username: '' }) as Request;
    const mockResponse = mockAuthResponse();

    await Register.prototype.create(mockRequest, mockResponse).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(ErrorMessages.VALIDATION_ERROR);
    });
  });

  it('should throw error if password is empty', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody, password: '' }) as Request;
    const mockResponse = mockAuthResponse();

    await Register.prototype.create(mockRequest, mockResponse).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(ErrorMessages.VALIDATION_ERROR);
    });
  });

  it('should throw error if phone number is empty', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody, phoneNumber: '' }) as Request;
    const mockResponse = mockAuthResponse();

    await Register.prototype.create(mockRequest, mockResponse).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(ErrorMessages.VALIDATION_ERROR);
    });
  });

  it('should throw error if full name is empty', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody, fullName: '' }) as Request;
    const mockResponse = mockAuthResponse();

    await Register.prototype.create(mockRequest, mockResponse).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(ErrorMessages.VALIDATION_ERROR);
    });
  });

  it('should throw error if username is exist', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody }) as Request;
    const mockResponse = mockAuthResponse();

    await Register.prototype.create(mockRequest, mockResponse).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(ErrorMessages.USERNAME_EXIST);
    });
  });

  it('should throw error if phone number is exist', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody }) as Request;
    const mockResponse = mockAuthResponse();

    await Register.prototype.create(mockRequest, mockResponse).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(ErrorMessages.PHONE_NUMBER_EXIST);
      expect(error.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });
  });

  it('should create user and auth and send correct json response', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody }) as Request;
    const mockResponse = mockAuthResponse();

    await Register.prototype.create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: expect.any(Object),
    });
  });

  it('should delete telegram auth if registered with telegram', async () => {
    const mockRequest = mockAuthRequest({ ...mockRegistrationBody, authType: 'telegram' }) as Request;
    const mockResponse = mockAuthResponse();

    jest.spyOn(telegramAuthService, 'removeTelegramAuthByPhoneNumber').mockImplementation(null as any);
    await Register.prototype.create(mockRequest, mockResponse);

    expect(telegramAuthService.removeTelegramAuthByPhoneNumber(mockRequest.body.phoneNumber));
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: expect.any(Object),
    });
  });
});
