import * as Joi from "@hapi/joi";

import AppSchema from "./app/app.schema";
import DatabaseSchema from "./database/database.schema";
import JWTSchema from "./jwt/jwt.schema";
import ApiSchema from "./api/api.schema";

export default Joi.object({
  ...AppSchema,
  ...DatabaseSchema,
  ...JWTSchema,
  ...ApiSchema
});
