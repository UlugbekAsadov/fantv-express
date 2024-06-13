import { UserModel } from '../models/user.model';
import { ObjectId } from 'mongodb';
import { IUserDocument } from '../utils/interfaces/user.interface';

export class UserService {
  public async getUserByAuthId(authId: string | ObjectId): Promise<IUserDocument> {
    const user = (await UserModel.findById(authId).exec()) as IUserDocument;
    return user;
  }
}

export const userService: UserService = new UserService();
