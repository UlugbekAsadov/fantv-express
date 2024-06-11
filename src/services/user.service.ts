import { User } from '../models/user.model';
import { ErrorMessages } from '../utils/enums/error-response.enum';

export class UserService {
  public async getUser(userId: string) {
    const user = await User.findById(userId);

    if (!user) throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };

    if (!user.isActive)
      throw { message: ErrorMessages.USER_NOT_ACTIVE, status: 401 };

    return { user };
  }
}
