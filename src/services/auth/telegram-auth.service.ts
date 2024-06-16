import { TelegramAuthModel } from "../../models/telegram-auth.model";
import { ITelegramAuthDocument } from "../../utils/interfaces/telegram-auth.interface";

class TelegramAuthService {
  public async getTelegramAuthByDeviceId(deviceId: string): Promise<ITelegramAuthDocument> {
    const auth = (await TelegramAuthModel.findOne({ deviceId }).exec()) as ITelegramAuthDocument;

    return auth;
  }

  public async getTelegramAuthById(id: string): Promise<ITelegramAuthDocument> {
    const auth = (await TelegramAuthModel.findById(id).exec()) as ITelegramAuthDocument;
    return auth;
  }

  public async refreshOtpByDeviceId(deviceId: string, otp: string, expireDate: Date): Promise<ITelegramAuthDocument> {
    const auth = (await TelegramAuthModel.findOneAndUpdate(
      { deviceId },
      { otp, expireDate },
      { new: true },
    ).exec()) as ITelegramAuthDocument;
    return auth;
  }

  public async removeTelegramAuthByPhoneNumber(phoneNumber: string): Promise<ITelegramAuthDocument> {
    const auth = (await TelegramAuthModel.findOneAndDelete({ phoneNumber }).exec()) as ITelegramAuthDocument;
    return auth;
  }
}

export const telegramAuthService: TelegramAuthService = new TelegramAuthService();
