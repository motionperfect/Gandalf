import * as Joi from '@hapi/joi';

export default {
  TOKEN_AUDIENCE: Joi.string()
    .uri()
    .required(),

  TOKEN_ISSUER: Joi.string()
    .uri()
    .required(),

  TOKEN_EXPIRATION: Joi.number()
    .integer()
    .positive()
    .min(15)
    .max(59)
    .default(15),
};
