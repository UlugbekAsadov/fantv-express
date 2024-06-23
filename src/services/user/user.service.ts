import { ObjectId } from 'mongodb';
import { UserModel } from '../../models/user.model';
import { IUserDocument } from '../../utils/interfaces/user.interface';

class UserService {
  public async findByIdAndUpdateBalance(userId: ObjectId, newBalance: number) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, { balance: newBalance }, { new: true });
    return updatedUser;
  }

  public async getUserByAuthId(authId: ObjectId): Promise<IUserDocument> {
    const user = (await UserModel.findById(authId)) as IUserDocument;
    return user;
  }
}

export const userService = new UserService();
