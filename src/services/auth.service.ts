import { IUserSchema, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import {
  IChangePassword,
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
  ITelegramCreateUser,
  ITelegramLoginRequest,
} from '../utils/interfaces/auth.interface';
import { ErrorMessages } from '../utils/enums/error-response.enum';
import { TelegramUsers } from '../models/telegram-login.model';
import { SuccessMessages } from '../utils/enums/success-response.enum';
import { UniqueUsernameGenerator } from '../utils/classes/unique-username-generator';
import { TelegramService } from './telegram.service';
import { generateJWTToken } from '../utils/utils';

export class UserService {
  private telegramService: TelegramService;

  constructor() {
    this.telegramService = new TelegramService();
  }

  public async register({
    password,
    isActive,
    phoneNumber,
    email,
    followers,
    fullName,
    price,
    username,
  }: IRegister): Promise<IRegisterResponse> {
    const isUserRegistered = await User.findOne({ phoneNumber });
    if (isUserRegistered)
      throw { status: 409, message: ErrorMessages.USER_EXISTS };

    const usernameGenerator = new UniqueUsernameGenerator();
    const randomUsername = usernameGenerator.generateUsername();

    const newUser: IUserSchema = {
      password,
      email: email || '',
      followers: followers || 0,
      fullName: fullName || '',
      isActive: isActive || true,
      phoneNumber,
      price: price || 0,
      username: username || randomUsername,
    };

    const user = new User(newUser);
    await user.save();
    return {
      access_token: generateJWTToken(user),
      user: user,
    };
  }

  public async login({
    phoneNumber,
    password,
  }: ILogin): Promise<ILoginResponse> {
    try {
      const user = await User.findOne({ phoneNumber });

      if (!user)
        throw {
          status: 404,
          message: ErrorMessages.USER_NOT_FOUND,
        };

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        throw { status: 401, message: ErrorMessages.INVALID_PASSWORD };

      const jwt = generateJWTToken(user);

      return { access_token: jwt, user: user };
    } catch (error) {
      throw error;
    }
  }

  public async changePassword({
    userId,
    password,
    confirmPassword,
  }: IChangePassword): Promise<ILoginResponse> {
    const newPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(userId);

    if (!user) throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };

    if (password !== confirmPassword)
      throw { status: 400, message: ErrorMessages.PASSWORD_DID_NOT_MATCHED };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true },
    );

    const jwt = generateJWTToken(user);

    return { access_token: jwt, user: updatedUser as IUserSchema };
  }

  public async telegramCheckOtp({ otp, deviceId }: ITelegramLoginRequest) {
    const telegramUser = await TelegramUsers.findOne({ deviceId });

    if (!telegramUser)
      throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };

    if (new Date(telegramUser.expireDate).getTime() < new Date().getTime())
      throw { status: 401, message: ErrorMessages.OTP_EXPIRED };

    if (telegramUser.otp !== otp)
      throw { status: 401, message: ErrorMessages.OTP_DID_NOT_MATCH };

    const user = await User.findOne({
      phoneNumber: telegramUser.phoneNumber,
    });

    if (user) {
      const jwtToken = generateJWTToken(user);
      return {
        token: jwtToken,
        status: 409,
        message: ErrorMessages.USER_EXISTS,
      };
    }

    const jwtToken = generateJWTToken(telegramUser);

    return {
      token: jwtToken,
      message: SuccessMessages.USER_CREATED,
      status: 201,
    };
  }

  public async telegramSetPassword({
    userId,
    password,
    confirmPassword,
  }: ITelegramCreateUser) {
    if (password !== confirmPassword)
      throw { status: 400, message: ErrorMessages.PASSWORD_DID_NOT_MATCHED };

    const telegramUser = await TelegramUsers.findById(userId);

    if (!telegramUser)
      throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };

    this.telegramService.telegramDeleteUser(telegramUser.phoneNumber);

    return await this.register({
      fullName: telegramUser.fullName,
      password,
      phoneNumber: telegramUser.phoneNumber,
      username: telegramUser.username,
    });
  }

  public async telegramCheckPassword({
    password,
    phoneNumber,
  }: {
    password: string;
    phoneNumber: string;
  }) {
    try {
      const loginData = await this.login({ phoneNumber, password });

      if (loginData.user) {
        await this.telegramService.telegramDeleteUser(phoneNumber);
        return loginData;
      }

      throw { message: ErrorMessages.PASSWORD_DID_NOT_MATCHED, status: 401 };
    } catch (error) {
      throw error;
    }
  }
}
