import * as Joi from '@hapi/joi'

export default {

  APP_PORT: Joi.number().integer().min(80).max(65535).default(3000),

  BCRYPT_ROUNDS: Joi.number().integer().positive().min(8).max(16).default(10),
}
