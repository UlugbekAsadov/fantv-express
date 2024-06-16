import Joi, { ObjectSchema } from 'joi';
import { ChannelStatus } from '../../utils/enums/channel.enum';

export const updateChannelSchema: ObjectSchema = Joi.object().keys({
  channelName: Joi.string().min(2).messages({
    'string.base': 'channelName must be of type string',
  }),
  channelUsername: Joi.string()
    .custom((value) => {
      const uppercaseRegex = /[A-Z]/;
      if (uppercaseRegex.test(value)) {
        throw Error('Username must not contain uppercase characters');
      }
      return value;
    })
    .alphanum()
    .messages({
      'string.base': 'channelUsername must be of type string',
    }),
  channelPrice: Joi.number().messages({
    'number.base': 'channelPrice must be of type number',
  }),
  channelCurrency: Joi.valid('UZS').messages({
    'string.base': 'channelCurrency must be of type enum',
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
    }),
});
