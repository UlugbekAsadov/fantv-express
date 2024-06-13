import Joi, { ObjectSchema } from 'joi';
import { AuthType } from '../../utils/enums/auth.enum';

const loginSchema: ObjectSchema = Joi.object().keys({
  phoneNumber: Joi.string().required().messages({
    'string.base': 'phoneNumber must be of type string',
    'string.empty': 'phoneNumber is a required field',
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': 'password must be of type string',
    'string.min': 'password must be at least 6 characters long',
    'string.empty': 'password is a required field',
  }),
  authType: Joi.custom((value) => {
    if (value === AuthType.Teleram || value === AuthType.Classic) {
      return value;
    }
    throw new Error('Invalid authType');
  }),
});

export { loginSchema };
