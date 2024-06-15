import Joi, { ObjectSchema } from 'joi';
import { AuthType } from '../../utils/enums/auth.enum';
import { AuthTypes } from '../../utils/types/auth.type';

const registerSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string()
    .required()
    .min(2)
    .custom((value) => {
      const uppercaseRegex = /[A-Z]/;
      if (uppercaseRegex.test(value)) {
        throw Error('Username must not contain uppercase characters');
      }
      return value;
    })
    .alphanum()
    .messages({
      'string.base': 'username must be of type string',
      'string.min': 'username must be at least 2 characters long',
      'string.empty': 'username is a required field',
    }),
  fullName: Joi.string().required().min(2).messages({
    'string.base': 'fullName must be of type string',
    'string.min': 'fullName must be at least 2 characters long',
    'string.empty': 'fullName is a required field',
  }),
  password: Joi.string().required().min(6).alphanum().messages({
    'string.base': 'password must be of type string',
    'string.min': 'password must be at least 6 characters long',
    'string.empty': 'password is a required field',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'phoneNumber must be of type string',
    'string.empty': 'phoneNumber is a required field',
  }),
  authType: Joi.custom((value: AuthTypes) => {
    if (value === 'classic' || value === 'telegram') {
      return value;
    }
    throw new Error('Invalid authType');
  }),
});

export { registerSchema };
