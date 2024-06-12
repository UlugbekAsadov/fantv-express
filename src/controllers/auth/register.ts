import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../../utils/helper/error-handler';
import { ErrorMessages } from '../../utils/enums/error-response.enum';
import HTTP_STATUS from 'http-status-codes';
import { IAuthDocument, IRegisterRequestData } from '../../utils/interfaces/auth.interface';
import { ObjectId } from 'mongodb';
import { IUserDocument } from '../../utils/interfaces/user.interface';
import { UserModel } from '../../models/user.model';
import { AuthModel } from '../../models/auth.model';
import { authService } from '../../services/auth.service';
import { generateJWTToken } from '../../utils/utils';

export class Register {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password, phoneNumber, fullName, authType } = req.body as IRegisterRequestData;

    const existingAuth = await authService.getAuthByPhoneNumberOrUsername(phoneNumber, username);

    if (existingAuth?.username === username) {
      return next(new BadRequestError(ErrorMessages.USERNAME_EXIST));
    }

    if (existingAuth?.phoneNumber === phoneNumber) {
      return next(new BadRequestError(ErrorMessages.PHONE_NUMBER_EXIST));
    }

    const _id: ObjectId = new ObjectId();

    const authData: IAuthDocument = {
      _id,
      username,
      password,
      phoneNumber,
      fullName,
      authType,
    } as IAuthDocument;

    const userData: IUserDocument = Register.prototype.userData(authData);

    const auth = await AuthModel.create(authData);
    const user = await UserModel.create(userData);

    await user.save();

    await auth.save();

    const token = generateJWTToken(auth, user.id);

    res.status(HTTP_STATUS.CREATED).json({ token, user });
  }

  private userData(data: IAuthDocument): IUserDocument {
    const { _id, username, phoneNumber, fullName } = data;

    return {
      _id,
      username,
      phoneNumber,
      fullName,
      isActive: true,
      followers: 0,
      price: 0,
      balance: 0,
      profilePhoto: '',
      coverPhoto: '',
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        telegram: '',
      },
    } as IUserDocument;
  }
}
