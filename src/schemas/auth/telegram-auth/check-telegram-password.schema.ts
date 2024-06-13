import Joi, { ObjectSchema } from 'joi';

const checkTelegramPasswordSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(6).messages({
    'string.base': 'password must be of type string',
    'string.min': 'password must be at least 6 characters long',
    'string.empty': 'password is a required field',
  }),
});

export { checkTelegramPasswordSchema };
