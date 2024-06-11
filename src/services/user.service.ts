import { User } from '../models/user.model';
import { ErrorMessages } from '../utils/enums/error-response.enum';

export class UserService {
  public async getUser(userId: string) {
    const user = await User.findById(userId);

    if (!user) return { status: 404, message: ErrorMessages.USER_NOT_FOUND };

    if (!user.isActive)
      return { message: ErrorMessages.USER_NOT_ACTIVE, status: 401 };

    return { user };
  }
}
