import { Response } from 'express';
import { UserService } from '../services/user.service';
import { Request } from '../utils/interfaces/express.interface';
import { ERROR_MESSAGES } from '../utils/error-messages/error-messages';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.getMe = this.getMe.bind(this);
  }

  public async getMe(req: Request, res: Response) {
    const userId = req.userId;
    if (!userId)
      return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });

    try {
      const user = await this.userService.getUser(userId);

      return res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

export const userController: UserController = new UserController();
