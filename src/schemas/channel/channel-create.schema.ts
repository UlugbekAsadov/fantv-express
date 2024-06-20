import Joi, { ObjectSchema } from 'joi';
import { ChannelStatus } from '../../utils/enums/channel.enum';

export const createChannelSchema: ObjectSchema = Joi.object().keys({
  channelName: Joi.string().required().min(2).messages({
    'string.base': 'channelName must be of type string',
    'string.min': 'channelName must be at least 2 characters long',
    'string.empty': 'channelName is a required field',
  }),
  channelUsername: Joi.string()
    .required()
    .custom((value) => {
      const uppercaseRegex = /[A-Z]/;
      if (uppercaseRegex.test(value)) {
        throw Error('Username must not contain uppercase characters');
      }
      return value;
    })
    .alphanum()
    .min(2)
    .messages({
      'string.base': 'channelUsername must be of type string',
      'string.min': 'channelUsername must be at least 2 characters long',
      'string.empty': 'channelUsername is a required field',
    }),
  channelPrice: Joi.number().required().messages({
    'number.base': 'channelPrice must be of type number',
    'number.empty': 'channelPrice is a required field',
  }),
  channelCurrency: Joi.valid('UZS').required().messages({
    'string.base': 'channelCurrency must be of type enum',
    'string.empty': 'channelCurrency is a required field',
  }),
  channelDescription: Joi.string().messages({
    'string.base': 'channelDescription must be of type string',
  }),
  channelLogo: Joi.string().messages({
    'string.base': 'channelLogo must be of type string',
  }),
  channelBanner: Joi.string().messages({
    'string.base': 'channelBanner must be of type string',
  }),
  status: Joi.string()
    .valid(...Object.values(ChannelStatus))
    .messages({
      'string.base': 'status must be of type string',
      'string.empty': 'status is a required field',
    }),
});
