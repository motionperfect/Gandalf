import * as Joi from '@hapi/joi';

export default {
  DB_PROVIDER: Joi.string()
    .lowercase()
    .default('mysql'),

  DB_HOST: Joi.string()
    .hostname()
    .default('localhost'),

  DB_PORT: Joi.number()
    .integer()
    .positive()
    .max(65535)
    .default(3306),

  DB_USER: Joi.string()
    .alphanum()
    .required(),

  DB_PASSWORD: Joi.string().required(),

  DB_SCHEMA: Joi.string()
    .lowercase()
    .required(),

  TYPEORM_SYNCHRONISE: Joi.boolean().default(false),
};
