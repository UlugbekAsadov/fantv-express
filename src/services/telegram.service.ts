import { TelegramUsers } from '../models/telegram-login.model';
import { ErrorMessages } from '../utils/enums/error-response.enum';
import { ITelegramUser } from '../utils/interfaces/auth.interface';

export class TelegramService {
  public async telegramCreateUser({
    otp,
    deviceId,
    phoneNumber,
    expireDate,
    fullName,
    username,
  }: ITelegramUser) {
    try {
      const telegramUser = await TelegramUsers.findOne({ deviceId });

      if (telegramUser) {
        return this.renewOpt({ deviceId, otp, expireDate });
      }

      const newTelegramUser: ITelegramUser = {
        deviceId,
        otp,
        phoneNumber: `+${phoneNumber}`,
        expireDate,
        fullName,
        username,
      };

      const user = new TelegramUsers(newTelegramUser);

      await user.save();
    } catch (error) {
      console.log(error);
    }
  }

  public async telegramDeleteUser(phoneNumber: string) {
    try {
      const user = await TelegramUsers.findOneAndDelete({ phoneNumber });
      if (!user) throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };
    } catch (error) {
      throw error;
    }
  }

  public async renewOpt({
    deviceId,
    otp,
    expireDate,
  }: {
    deviceId: string;
    otp: string;
    expireDate: Date;
  }) {
    try {
      const user = await TelegramUsers.findOneAndUpdate(
        { deviceId },
        { otp, expireDate },
        { new: true },
      );

      if (!user) throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };

      return user;
    } catch (error) {
      throw error;
    }
  }
}
