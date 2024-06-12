import { AuthModel } from '../models/auth.model';
import { IAuthDocument } from '../utils/interfaces/auth.interface';

export class AuthService {
  public async getAuthByPhoneNumber(phoneNumber: string): Promise<IAuthDocument> {
    const auth = (await AuthModel.findOne({ phoneNumber }).exec()) as IAuthDocument;
    return auth;
  }

  public async getAuthByPhoneNumberOrUsername(phoneNumber: string, username: string): Promise<IAuthDocument> {
    const query = {
      $or: [{ username }, { phoneNumber }],
    };

    const auth = (await AuthModel.findOne(query).exec()) as IAuthDocument;
    return auth;
  }

  public async getAuthById(id: string): Promise<IAuthDocument> {
    const auth = (await AuthModel.findById(id).exec()) as IAuthDocument;
    return auth;
  }

  public async changeAuthPassword(authId: string, hashedPassword: string): Promise<IAuthDocument> {
    const auth = (await AuthModel.findByIdAndUpdate(authId, { password: hashedPassword }, { new: true }).exec()) as IAuthDocument;
    return auth;
  }
}

export const authService: AuthService = new AuthService();
