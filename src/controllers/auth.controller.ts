import { Response } from 'express';
import { UserService } from '../services/auth.service';
import { IUserSchema } from '../models/user.model';
import { Request } from '../utils/interfaces/express.interface';
import { ErrorMessages } from '../utils/enums/error-response.enum';

export class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.telegramCheckOtp = this.telegramCheckOtp.bind(this);
    this.telegramSetPassword = this.telegramSetPassword.bind(this);
    this.telegramCheckPassword = this.telegramCheckPassword.bind(this);
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
      });

      res.status(201).json({ user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { phoneNumber, password } = req.body;

    try {
      const user = await this.userService.login({
        phoneNumber,
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

  public async telegramCheckOtp(req: Request, res: Response): Promise<void> {
    const { otp, deviceId } = req.body;

    try {
      const user = await this.userService.telegramCheckOtp({
        otp,
        deviceId,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async telegramSetPassword(req: Request, res: Response): Promise<void> {
    const { password, confirmPassword } = req.body;
    const { userId } = req;

    if (!userId) {
      throw { message: ErrorMessages.ACCESS_DENIED, status: 401 };
    }

    try {
      const user = await this.userService.telegramSetPassword({
        userId,
        password,
        confirmPassword,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async telegramCheckPassword(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { password } = req.body;
    const { phoneNumber } = req;

    try {
      if (!phoneNumber) throw { message: ErrorMessages.ACCESS_DENIED, status: 401 };

      const user = await this.userService.telegramCheckPassword({
        password,
        phoneNumber,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
