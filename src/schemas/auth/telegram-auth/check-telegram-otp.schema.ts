import Joi, { ObjectSchema } from 'joi';

const checkTelegramOtpSchema: ObjectSchema = Joi.object().keys({
  otp: Joi.string().required().min(6).max(6).messages({
    'string.base': 'otp must be of type string',
    'string.min': 'otp must be at least 6 characters long',
    'string.max': 'otp must be at least 6 characters long',
    'string.empty': 'otp is a required field',
  }),

  deviceId: Joi.string().required().messages({
    'string.empty': 'deviceId is required',
    'any.required': 'deviceId is required',
  }),
});

export { checkTelegramOtpSchema };
