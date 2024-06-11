import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { IUserSchema } from '../models/user.model';
import { Request } from '../utils/interfaces/express.interface';
import { ErrorMessages } from '../utils/enums/error-response.enum';

export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.telegramCheckOtp = this.telegramCheckOtp.bind(this);
    this.telegramSetPassword = this.telegramSetPassword.bind(this);
    this.telegramCheckPassword = this.telegramCheckPassword.bind(this);
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { username, password, phoneNumber, fullName, email }: IUserSchema =
      req.body;

    try {
      const user = await this.authService.register({
        username,
        password,
        phoneNumber,
        fullName,
        email,
      });

      res.status(201).json(user);
    } catch (error: any) {
      res.status(error.status).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { phoneNumber, password } = req.body;

    try {
      const user = await this.authService.login({
        phoneNumber,
        password,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ error: error.message });
    }
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { confirmPassword, password } = req.body;
      const userId = req.userId;

      if (!userId) throw { status: 404, message: 'User not found' };

      const user = await this.authService.changePassword({
        userId,
        password,
        confirmPassword,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ error: error.message });
    }
  }

  public async telegramCheckOtp(req: Request, res: Response): Promise<void> {
    const { otp, deviceId } = req.body;

    try {
      const user = await this.authService.telegramCheckOtp({
        otp,
        deviceId,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ error: error.message });
    }
  }

  public async telegramSetPassword(req: Request, res: Response): Promise<void> {
    const { password, confirmPassword } = req.body;
    const { userId } = req;

    try {
      if (!userId) {
        throw { message: ErrorMessages.ACCESS_DENIED, status: 401 };
      }

      const user = await this.authService.telegramSetPassword({
        userId,
        password,
        confirmPassword,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ error: error.message });
    }
  }

  public async telegramCheckPassword(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { password } = req.body;
    const { phoneNumber } = req;

    try {
      if (!phoneNumber)
        throw { message: ErrorMessages.ACCESS_DENIED, status: 401 };

      const user = await this.authService.telegramCheckPassword({
        password,
        phoneNumber,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ error: error.message });
    }
  }
}
