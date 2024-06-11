import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { IUserSchema } from '../models/user.model';
import { Request } from '../utils/interfaces/express.interface';
import { ErrorMessages } from '../utils/enums/error-response.enum';
import { handleRequest } from '../utils/utils';

class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();

    this.register = handleRequest(this.register.bind(this));
    this.login = handleRequest(this.login.bind(this));
    this.changePassword = handleRequest(this.changePassword.bind(this));
    this.telegramCheckOtp = handleRequest(this.telegramCheckOtp.bind(this));
    this.telegramSetPassword = handleRequest(
      this.telegramSetPassword.bind(this),
    );
    this.telegramCheckPassword = handleRequest(
      this.telegramCheckPassword.bind(this),
    );
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { username, password, phoneNumber, fullName, ...rest }: IUserSchema =
      req.body;

    const response = await this.authService.register({
      username,
      password,
      phoneNumber,
      fullName,
      ...rest,
    });

    res.status(201).json(response);
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { phoneNumber, password } = req.body;

    const response = await this.authService.login({
      phoneNumber,
      password,
    });

    res.status(200).json(response);
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    const { confirmPassword, password } = req.body;
    const userId = req.userId;

    if (!userId) throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };

    const response = await this.authService.changePassword({
      userId,
      password,
      confirmPassword,
    });

    res.status(200).json(response);
  }

  public async telegramCheckOtp(req: Request, res: Response): Promise<void> {
    const { otp, deviceId } = req.body;

    const response = await this.authService.telegramCheckOtp({
      otp,
      deviceId,
    });

    res.status(200).json(response);
  }

  public async telegramSetPassword(req: Request, res: Response): Promise<void> {
    const { password, confirmPassword } = req.body;
    const { userId } = req;

    if (!userId) {
      throw { message: ErrorMessages.ACCESS_DENIED, status: 401 };
    }

    const response = await this.authService.telegramSetPassword({
      userId,
      password,
      confirmPassword,
    });

    res.status(200).json(response);
  }

  public async telegramCheckPassword(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { password } = req.body;
    const { phoneNumber } = req;

    if (!phoneNumber) {
      throw { message: ErrorMessages.ACCESS_DENIED, status: 401 };
    }

    const response = await this.authService.telegramCheckPassword({
      password,
      phoneNumber,
    });

    res.status(200).json(response);
  }
}

export const authController: AuthController = new AuthController();
