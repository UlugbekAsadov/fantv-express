import Joi, { ObjectSchema } from 'joi';

const registerSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(2).messages({
    'string.base': 'username must be of type string',
    'string.min': 'username must be at least 2 characters long',
    'string.empty': 'username is a required field',
  }),
  fullName: Joi.string().required().min(2).messages({
    'string.base': 'fullName must be of type string',
    'string.min': 'fullName must be at least 2 characters long',
    'string.empty': 'fullName is a required field',
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': 'password must be of type string',
    'string.min': 'password must be at least 2 characters long',
    'string.empty': 'password is a required field',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'phoneNumber must be of type string',
    'string.empty': 'phoneNumber is a required field',
  }),
});

export { registerSchema };
