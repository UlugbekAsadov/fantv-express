import { Response } from 'express';
import { UserService } from '../services/user.service';
import { IUserSchema } from '../models/user.model';
import { Request } from '../utils/interfaces/express.interface';

export class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { username, password, phoneNumber, fullName, email }: IUserSchema =
      req.body;

    try {
      const user = await this.userService.register({
        username,
        password,
        phoneNumber,
        fullName,
        email,
        isActive: true,
        followers: 0,
        price: 0,
      });

      res.status(201).json({ user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await this.userService.login({
        email,
        password,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { confirmPassword, password } = req.body;
      const userId = req.userId;

      if (!userId) throw { status: 404, message: 'User not found' };

      const user = await this.userService.forgotPassword({
        userId,
        password,
        confirmPassword,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
