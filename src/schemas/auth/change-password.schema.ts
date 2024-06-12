import Joi, { ObjectSchema } from 'joi';

const changePasswordSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(6).messages({
    'string.base': 'password must be of type string',
    'string.min': 'password must be at least 6 characters long',
    'string.empty': 'password is a required field',
  }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().min(6).messages({
    'any.only': 'confirmPassword must match new password',
    'string.empty': 'confirmPassword is required',
    'string.min': 'confirmPassword must be at least 6 characters long',
    'any.required': 'confirmPassword is required',
  }),
});

export { changePasswordSchema };
