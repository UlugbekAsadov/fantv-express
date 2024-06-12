import Joi, { ObjectSchema } from 'joi';

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
});

export { loginSchema };
