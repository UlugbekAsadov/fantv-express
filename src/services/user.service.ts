import { IUserSchema, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import {
  IForgotPassword,
  ILogin,
  ILoginResponse,
} from '../utils/interfaces/auth.interface';
import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../utils/enums/error-response.enum';

export class UserService {
  public async register({
    password,
    isActive,
    ...args
  }: IUserSchema): Promise<IUserSchema> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      password: hashedPassword,
      ...args,
    });
    await user.save();
    return user;
  }

  public async login({ email, password }: ILogin): Promise<ILoginResponse> {
    const user = await User.findOne({ email });
    if (!user)
      throw {
        status: 404,
        message: ErrorMessages.USER_NOT_FOUND,
      };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw { status: 401, message: ErrorMessages.INVALID_PASSWORD };

    const jwt = this.generateJWTToken(user);

    return { access_token: jwt, user: user };
  }

  public async forgotPassword({
    userId,
    password,
    confirmPassword,
  }: IForgotPassword): Promise<ILoginResponse> {
    const newPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(userId);

    if (!user) throw { status: 404, message: ErrorMessages.USER_NOT_FOUND };

    if (password !== confirmPassword)
      throw { status: 400, message: ErrorMessages.PASSWORD_DID_NOT_MATCHED };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true },
    );

    const jwt = this.generateJWTToken(user);

    return { access_token: jwt, user: updatedUser as IUserSchema };
  }

  public generateJWTToken(
    user: IUserSchema extends Document ? IUserSchema : any,
  ) {
    const { _id: userId } = user;
    const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return jwtToken;
  }
}
